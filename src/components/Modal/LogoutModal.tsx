import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { Title as MantineTitle } from '@mantine/core';

import Button from '../Button/Button';
import Modal from './Modal';

type LogoutModalProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

const LogoutModal = ({ opened, setOpened }: LogoutModalProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const data = await signOut({ redirect: false });

    const callbackUrl =
      new URL(data.url!).searchParams.get('callbackUrl') ?? '/';
    router.push(callbackUrl);
  };

  return (
    <>
      <Modal opened={opened} setOpened={setOpened}>
        <MantineTitle align="center" order={5}>
          Are you sure you want to log out?
        </MantineTitle>

        <Button onClick={handleLogOut}>Log out</Button>
      </Modal>
    </>
  );
};

export default LogoutModal;
