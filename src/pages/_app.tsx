import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';

import theme from '../constants/theme';
import AppShell from '../components/Layout/AppShell';
import ScrollToTop from '../components/Button/ScrollToTop';
import Layout from '../components/Layout/Layout';
import type { AppPropsWithLayout } from '../@types';

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
          <AppShell>{getLayout(<Component {...pageProps} />)}</AppShell>
          <ScrollToTop />
        </MantineProvider>
      </SessionProvider>
    </>
  );
};

export default App;
