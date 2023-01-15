import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MySession } from '../../@types';

const AdminDashboard: NextPage = () => {
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

export default AdminDashboard;
