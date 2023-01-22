import { createStyles } from '@mantine/core';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import Paper from '../../components/Layout/Paper';
import AdminsTable from '../../components/Table/AdminsTable';
import CreateAdminForm from '../../components/Form/CreateAdminForm';

const useStyles = createStyles(() => ({
  form: {
    width: '100%',
  },
  alert: {
    marginBottom: '1rem',
  },
  input: {
    marginBottom: '1.5rem',
  },
  button: {
    marginTop: '1rem',
  },
  table: {
    width: '5rem',
  },
}));

const AdministratorsPage: NextPageWithLayout = () => {
  const { classes } = useStyles();

  return (
    <>
        <Paper>
            <CreateAdminForm />
        </Paper>

      <Paper>
        <AdminsTable className={classes.table} />
      </Paper>
    </>
  );
};

AdministratorsPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdministratorsPage;
