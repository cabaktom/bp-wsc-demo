import '../styles/reset.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import theme from '../constants/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Default title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>

      <MantineProvider withGlobalStyles theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
};

export default App;
