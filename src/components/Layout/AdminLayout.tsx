import { type ReactNode, useState } from 'react';

import AdminTabs from '../Navigation/AdminTabs';
import AdminAffix from './AdminAffix';
import LogoutModal from '../Modal/LogoutModal';
import AdminsProvider from '../../context/AdminsProvider';

type AdminLayoutProps = {
  children?: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <AdminsProvider>
      <AdminTabs>{children}</AdminTabs>

      <AdminAffix setOpened={setOpened} />

      <LogoutModal opened={opened} setOpened={setOpened} />
    </AdminsProvider>
  );
};

export default AdminLayout;
