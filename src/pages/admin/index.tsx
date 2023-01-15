import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MySession, NextPageWithLayout } from '../../@types';
import AdminLayout from '../../components/Layout/AdminLayout';

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
