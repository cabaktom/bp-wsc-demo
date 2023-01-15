import type { ReactNode } from 'react';

import Content from './Content';

type AdminLayoutProps = {
  children?: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <Content>{children}</Content>
    </>
  );
};

export default AdminLayout;
