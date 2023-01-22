import { useRouter } from 'next/router';
import type { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import {
  Affix as MantineAffix,
  Container as MantineContainer,
  Group as MantineGroup,
  Text as MantineText,
  createStyles,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconDeviceFloppy } from '@tabler/icons';

import Button from '../Button/Button';

const useStyles = createStyles((theme) => ({
  bar: {
    width: '100vw',
    backgroundColor: [theme.colors[theme.primaryColor][7]],
  },
}));

const AdminAffix = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  const handleLogOut = async () => {
    const data = await signOut({ redirect: false });

    const callbackUrl =
      new URL(data.url!).searchParams.get('callbackUrl') ?? '/';
    router.push(callbackUrl);
  };

  const openLogoutModal = () =>
    openConfirmModal({
      title: 'Logout',
      centered: true,
      size: 'sm',
      children: (
        <MantineText size="sm">
          Are you sure you want to logout? You will be redirected to the home
          page.
        </MantineText>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: handleLogOut,
      groupProps: { spacing: 'xs', noWrap: true },
      confirmProps: { children: 'Log out' },
    });

  return (
    <>
      <MantineAffix className={classes.bar}>
        <MantineContainer mt="xs" mb="xs" size="lg">
          <MantineGroup position="apart">
            <MantineGroup spacing="lg">
              <MantineText c="white" fw="bold">
                Logged in ({user?.username})
              </MantineText>
              <Button color="red" variant="filled" onClick={openLogoutModal}>
                Log out
              </Button>
            </MantineGroup>

            <Button color="green" variant="filled">
              <IconDeviceFloppy />
            </Button>
          </MantineGroup>
        </MantineContainer>
      </MantineAffix>
    </>
  );
};

export default AdminAffix;
