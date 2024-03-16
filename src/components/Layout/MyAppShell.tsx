import { type ReactNode, useEffect, useState } from 'react';
import {
  AppShell,
  TypographyStylesProvider,
  createStyles,
} from '@mantine/core';
import { useRouter } from 'next/router';

import NavDropdown from '../Navigation/NavDropdown';
import Navbar from '../Navigation/Navbar';

const useStyles = createStyles(() => ({
  provider: {
    height: '100%',
  },
}));

type MyAppShellProps = {
  children: ReactNode;
};

const MyAppShell = ({ children }: MyAppShellProps) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const { classes } = useStyles();

  // global event - close nav dropdown on ESC keypress
  useEffect(() => {
    const handleKeyDownEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpened(false);
    };

    document.addEventListener('keydown', handleKeyDownEsc);
    return () => {
      document.removeEventListener('keydown', handleKeyDownEsc);
    };
  }, []);

  return (
    <AppShell
      padding={0}
      fixed
      header={
        router.route !== '/landing' ? ( // hide navbar on landing page
          <Navbar opened={opened} setOpened={setOpened} />
        ) : (
          <></>
        )
      }
      navbar={<NavDropdown opened={opened} setOpened={setOpened} />}
    >
      <TypographyStylesProvider className={classes.provider}>
        {children}
      </TypographyStylesProvider>
    </AppShell>
  );
};

export default MyAppShell;
