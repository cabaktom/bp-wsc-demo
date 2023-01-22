import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import theme from '../constants/theme';
import AppShell from '../components/Layout/AppShell';
import ScrollToTop from '../components/Button/ScrollToTop';
import Layout from '../components/Layout/Layout';
import type { AppPropsWithLayout } from '../@types';
import ModalsProvider from '../components/Modal/ModalsProvider';

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

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
          <ModalsProvider>
            <NotificationsProvider limit={5}>
              <AppShell>{getLayout(<Component {...pageProps} />)}</AppShell>
              <ScrollToTop />
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
};

export default App;
