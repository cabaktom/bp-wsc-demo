import { useContext, useEffect } from 'react';
import { createStyles } from '@mantine/core';
import { z } from 'zod';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import { prisma } from '../../lib/prisma';
import Paper from '../../components/Layout/Paper';
import AdminsTable from '../../components/Table/AdminsTable';
import { AdminOut } from '../../schemas/Admin';
import CreateAdminForm from '../../components/Form/CreateAdminForm';
import AdminsContext from '../../context/admins-context';

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

type AdministratorsPageProps = {
  initialAdmins: z.infer<typeof AdminOut>[];
};

const AdministratorsPage: NextPageWithLayout<AdministratorsPageProps> = ({
  initialAdmins,
}) => {
  const { classes } = useStyles();
  const ctx = useContext(AdminsContext);

  useEffect(() => {
    ctx.setAdmins(initialAdmins);
  }, [ctx, initialAdmins]);

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

export async function getServerSideProps() {
  const admins = await prisma.admin.findMany({ orderBy: { id: 'asc' } });
  const adminsOut = admins.map((admin) => AdminOut.parse(admin));

  return {
    props: {
      initialAdmins: adminsOut,
    },
  };
}
