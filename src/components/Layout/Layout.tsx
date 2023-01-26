import type { ReactNode } from 'react';
import { z } from 'zod';

import Header from '../Header/Header';
import Content from './Content';
import Footer from '../Footer/Footer';
import { SettingOut } from '../../schemas/Setting';

type LayoutProps = {
  children?: ReactNode;
  settings: z.infer<typeof SettingOut>[];
};

const Layout = ({ children, settings }: LayoutProps) => {
  return (
    <>
      <Header settings={settings} />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

export default Layout;
