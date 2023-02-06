import { MantineProvider } from '@mantine/core';

import AdminTabs from '../Navigation/AdminTabs';

type AdminLayoutProps = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <MantineProvider
      theme={{
        components: {
          Title: {
            styles: {
              root: {
                margin: '0 0 1rem 0 !important',
              },
            },
          },
        },
      }}
      inherit
    >
      <AdminTabs>{children}</AdminTabs>
    </MantineProvider>
  );
};

export default AdminLayout;
