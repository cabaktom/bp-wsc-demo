import { SWRConfig } from 'swr';
import { Stack, Grid, Title, Paper } from '@mantine/core';
import { useSession } from 'next-auth/react';
import type { Admin } from '@prisma/client';
import { GetServerSideProps } from 'next';
import type { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import CreateAdminForm from '../../components/Form/CreateAdminForm';
import ChangePasswordForm from '../../components/Form/ChangePasswordForm';
import AdministratorsDataTable from '../../components/Table/AdministratorsDataTable';
import { prisma } from '../../lib/prisma';

type AdministratorsPageProps = {
  fallback: {
    '/api/admins': Admin[];
  };
};

const AdministratorsPage: NextPageWithLayout<AdministratorsPageProps> = ({
  fallback,
}) => {
  const { data: session } = useSession();

  const { id } = session?.user ?? {
    id: '',
  };

  return (
    <SWRConfig value={{ fallback }}>
      <Stack spacing="md">
        <Grid align="start" gutter="md">
          <Grid.Col xs={12} md={6} offsetMd={0}>
            <Paper>
              <Title order={3}>New administrator</Title>

              <CreateAdminForm />
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} md={6} offsetMd={0}>
            <Paper>
              <Title order={3}>Change password</Title>

              <ChangePasswordForm id={id} />
            </Paper>
          </Grid.Col>
        </Grid>

        <AdministratorsDataTable />
      </Stack>
    </SWRConfig>
  );
};

AdministratorsPage.getLayout = (page) => {
  return (
    <AdminLayout settings={page.props.settings} title={page.props.title}>
      {page}
    </AdminLayout>
  );
};

export default AdministratorsPage;

export const getServerSideProps: GetServerSideProps<
  AdministratorsPageProps
> = async (context) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    };
  }

  const administrators = await prisma.admin.findMany({
    where: { createdByAdminId: (token.user as User).id },
  });
  const settings = await prisma.siteSettings.findMany({
    where: { adminId: (token.user as User).id },
  });

  return {
    props: {
      fallback: {
        '/api/admins': administrators,
      },
      title: 'Edit administrators',
      settings,
    },
  };
};
