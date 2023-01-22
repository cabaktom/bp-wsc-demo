import { Stack, Grid, Title, LoadingOverlay } from '@mantine/core';
import { useSession } from 'next-auth/react';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import Paper from '../../components/Layout/Paper';
import CreateAdminForm from '../../components/Form/CreateAdminForm';
import DataTable from '../../components/Table/DataTable';
import EditAdminForm from '../../components/Form/EditAdminForm';
import ChangePasswordForm from '../../components/Form/ChangePasswordForm';

const AdministratorsPage: NextPageWithLayout = () => {
  const { data: session } = useSession();

  const { id, username, email } = session?.user ?? {
    id: -1,
    username: '',
    email: '',
  };

  return (
    <>
      <Stack spacing="md">
        <Grid align="center" gutter="xl">
          <Grid.Col offsetXs={1} xs={10} offsetSm={0} sm={6}>
            <Paper pos="relative">
              <LoadingOverlay visible={!session} />

              <Title order={4}>Your account</Title>
              <EditAdminForm id={id} username={username} email={email} />

              <Title order={4}>Change password</Title>
              <ChangePasswordForm id={id} />
            </Paper>
          </Grid.Col>
          <Grid.Col offsetXs={1} xs={10} offsetSm={0} sm={6}>
            <Paper>
              <Title order={4}>New administrator</Title>

              <CreateAdminForm />
            </Paper>
          </Grid.Col>
        </Grid>

        <DataTable />
      </Stack>
    </>
  );
};

AdministratorsPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdministratorsPage;
