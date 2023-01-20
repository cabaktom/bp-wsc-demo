import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import {
  Modal as MantineModal,
  Stack as MantineStack,
  Title as MantineTitle,
} from '@mantine/core';

import Button from '../Button/Button';

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
      <MantineModal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        size="xs"
        closeButtonLabel="Close logout modal"
        overlayOpacity={0.4}
        overlayBlur={2}
        transitionDuration={200}
        exitTransitionDuration={100}
      >
        <MantineStack align="center" spacing="xl">
          <MantineTitle align="center" order={5}>
            Are you sure you want to log out?
          </MantineTitle>

          <Button onClick={handleLogOut}>Log out</Button>
        </MantineStack>
      </MantineModal>
    </>
  );
};

export default LogoutModal;
