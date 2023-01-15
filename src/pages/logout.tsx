import type { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const LogOutPage: NextPage = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' });
    router.push(data.url);
  };

  return (
    <>
      <button type="button" onClick={handleLogOut}>
        Log out
      </button>
    </>
  );
};

export default LogOutPage;
