import { SWRConfig } from 'swr';
import { Stack, Grid, Title, LoadingOverlay } from '@mantine/core';
import { useSession } from 'next-auth/react';
import type { Admin } from '@prisma/client';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import MyPaper from '../../components/Layout/MyPaper';
import CreateAdminForm from '../../components/Form/CreateAdminForm';
import EditAdminForm from '../../components/Form/EditAdminForm';
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

  const { id, username, email } = session?.user ?? {
    id: -1,
    username: '',
    email: '',
  };

  return (
    <SWRConfig value={{ fallback }}>
      <Stack spacing="md">
        <Grid align="center" gutter="xl">
          <Grid.Col offsetXs={1} xs={10} offsetSm={0} sm={6}>
            <MyPaper pos="relative">
              <LoadingOverlay visible={!session} />

              <Title order={4}>Your account</Title>
              <EditAdminForm id={id} username={username} email={email} />

              <Title order={4}>Change password</Title>
              <ChangePasswordForm id={id} />
            </MyPaper>
          </Grid.Col>
          <Grid.Col offsetXs={1} xs={10} offsetSm={0} sm={6}>
            <MyPaper>
              <Title order={4}>New administrator</Title>

              <CreateAdminForm />
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
