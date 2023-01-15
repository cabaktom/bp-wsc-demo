import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import theme from '../constants/theme';
import AppShell from '../components/Layout/AppShell';
import Header from '../components/Header/Header';
import Content from '../components/Layout/Content';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/Button/ScrollToTop';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>Student workshop on scientific computing</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </Head>

        <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
          <AppShell>
            <Header />

            <Content>
              <Component {...pageProps} />
            </Content>

            <Footer />
            <ScrollToTop />
          </AppShell>
        </MantineProvider>
      </SessionProvider>
    </>
  );
};

export default App;
