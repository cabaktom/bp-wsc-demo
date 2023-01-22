import { Stack } from '@mantine/core';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import Paper from '../../components/Layout/Paper';
import CreateAdminForm from '../../components/Form/CreateAdminForm';
import DataTable from '../../components/Table/DataTable';

const AdministratorsPage: NextPageWithLayout = () => {
  return (
    <>
      <Stack spacing="md">
        <Paper>
          <CreateAdminForm />
        </Paper>

        <DataTable />
      </Stack>
    </>
  );
};

AdministratorsPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdministratorsPage;
