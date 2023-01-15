import React, { ReactNode } from 'react';

import Header from '../Header/Header';
import Content from './Content';
import Footer from '../Footer/Footer';

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

export default Layout;
