import type { ReactNode } from 'react';
import Head from 'next/head';
import type { SiteSettings } from '@prisma/client';

import Header from '../Header/Header';
import Content from './Content';
import Footer from '../Footer/Footer';

type LayoutProps = {
  children?: ReactNode;
  settings: SiteSettings[];
  title: string;
  contentWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const Layout = ({
  children,
  settings,
  title,
  contentWidth = 'lg',
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} | ${settings[0].value}` : settings[0].value}
        </title>
      </Head>

      <Header settings={settings} />
      <Content size={contentWidth}>{children}</Content>
      <Footer />
    </>
  );
};

export default Layout;
