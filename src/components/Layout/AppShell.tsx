import React, { ReactNode, useEffect, useState } from 'react';
import { AppShell as MantineAppShell } from '@mantine/core';
import NavDropdown from '../Navigation/NavDropdown';
import Navbar from '../Navigation/Navbar';

type AppShellProps = {
  children: ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  const [opened, setOpened] = useState(false);

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
    <MantineAppShell
      padding={0}
      fixed
      header={<Navbar opened={opened} setOpened={setOpened} />}
      navbar={<NavDropdown opened={opened} setOpened={setOpened} />}
    >
      {children}
    </MantineAppShell>
  );
};

export default AppShell;
