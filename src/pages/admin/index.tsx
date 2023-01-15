import { useSession } from 'next-auth/react';
import Link from 'next/link';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { MySession, NextPageWithLayout } from '../../@types';

const AdminDashboardPage: NextPageWithLayout = () => {
  const { data } = useSession();
  const session = data as MySession;

  return (
    <>
      <h3>Admin dashboard</h3>
      <h2>Username: {session?.user?.username}</h2>

      <Link href="/logout">Log out page</Link>
    </>
  );
};

AdminDashboardPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminDashboardPage;
