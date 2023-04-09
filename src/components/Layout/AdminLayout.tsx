import Head from 'next/head';
import type { SiteSettings } from '@prisma/client';

import AdminTabs from '../Navigation/AdminTabs';

type AdminLayoutProps = {
  children?: React.ReactNode;
  settings: SiteSettings[];
  title: string;
};

const AdminLayout = ({ children, settings, title }: AdminLayoutProps) => {
  const globalTitle = settings.find(
    (setting) => setting.option === 'title',
  )?.value;

  return (
    <>
      <Head>
        <title>{globalTitle ? `${title} | ${globalTitle}` : title}</title>
      </Head>
      <AdminTabs>{children}</AdminTabs>;
    </>
  );
};

export default AdminLayout;
