import AdminTabs from '../Navigation/AdminTabs';

type AdminLayoutProps = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <AdminTabs>{children}</AdminTabs>;
};

export default AdminLayout;
