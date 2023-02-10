import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import theme from '../constants/theme';
import MyAppShell from '../components/Layout/MyAppShell';
import ScrollToTop from '../components/Button/ScrollToTop';
import Layout from '../components/Layout/Layout';
import type { AppPropsWithLayout } from '../@types';
import MyModalsProvider from '../components/Modal/MyModalsProvider';

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Layout settings={pageProps.settings} title={pageProps.page?.title}>
        {page}
      </Layout>
    ));

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
          <MyModalsProvider>
            <NotificationsProvider limit={5}>
              <MyAppShell>{getLayout(<Component {...pageProps} />)}</MyAppShell>
              <ScrollToTop />
            </NotificationsProvider>
          </MyModalsProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
};

export default App;
