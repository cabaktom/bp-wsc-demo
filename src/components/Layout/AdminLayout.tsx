import AdminTabs from '../Navigation/AdminTabs';
import AdminAffix from './AdminAffix';
import AdminsProvider from '../../context/AdminsProvider';

type AdminLayoutProps = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <AdminsProvider>
      <AdminTabs>{children}</AdminTabs>
      <AdminAffix />
    </AdminsProvider>
  );
};

export default AdminLayout;
