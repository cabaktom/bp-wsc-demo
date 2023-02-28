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
  const globalTitle = settings.find(
    (setting) => setting.option === 'title',
  )?.value;

  return (
    <>
      <Head>
        <title>{globalTitle ? `${title} | ${globalTitle}` : title}</title>
      </Head>

      <Header settings={settings} />
      <Content size={contentWidth}>{children}</Content>
      <Footer />
    </>
  );
};

export default Layout;
