import { ReactNode, useState } from 'react';
import AdminTabs from '../Navigation/AdminTabs';
import AdminAffix from './AdminAffix';
import LogoutModal from '../Modal/LogoutModal';

type AdminLayoutProps = {
  children?: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AdminTabs>{children}</AdminTabs>

      <AdminAffix setOpened={setOpened} />

      <LogoutModal opened={opened} setOpened={setOpened} />
    </>
  );
};

export default AdminLayout;
