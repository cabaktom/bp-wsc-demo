import AdminTabs from '../Navigation/AdminTabs';
import AdminsProvider from '../../context/AdminsProvider';

type AdminLayoutProps = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <AdminsProvider>
      <AdminTabs>{children}</AdminTabs>
    </AdminsProvider>
  );
};

export default AdminLayout;
