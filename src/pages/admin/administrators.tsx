import { SWRConfig } from 'swr';
import { Stack, Grid, Title } from '@mantine/core';
import { useSession } from 'next-auth/react';
import type { Admin } from '@prisma/client';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import MyPaper from '../../components/Layout/MyPaper';
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
    id: -1,
  };

  return (
    <SWRConfig value={{ fallback }}>
      <Stack spacing="md">
        <Grid align="start" gutter="md">
          <Grid.Col xs={12} md={6} offsetMd={0}>
            <MyPaper>
              <Title order={3}>New administrator</Title>

              <CreateAdminForm />
            </MyPaper>
          </Grid.Col>
          <Grid.Col xs={12} md={6} offsetMd={0}>
            <MyPaper>
              <Title order={3}>Change password</Title>

              <ChangePasswordForm id={id} />
            </MyPaper>
          </Grid.Col>
        </Grid>

        <AdministratorsDataTable />
      </Stack>
    </SWRConfig>
  );
};

AdministratorsPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdministratorsPage;

export async function getServerSideProps() {
  const administrators = await prisma.admin.findMany({});

  return {
    props: {
      fallback: {
        '/api/admins': administrators,
      },
    },
  };
}
