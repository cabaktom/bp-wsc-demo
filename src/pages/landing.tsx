import Head from 'next/head';
import { createStyles } from '@mantine/core';

import LandingForm from '../components/Form/LandingForm';
import { NextPageWithLayout } from '../@types';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '80%',
    margin: '0 auto',
    maxWidth: '40rem',

    [theme.fn.smallerThan('xs')]: {
      width: '95%',
    },
  },
  title: {},
}));

const LandingPage: NextPageWithLayout = () => {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.inner}>
        <h1 className={classes.title}>Start a demo</h1>

        <LandingForm />
      </div>
    </>
  );
};

LandingPage.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Demo</title>
      </Head>
      {page}
    </>
  );
};

export default LandingPage;

export async function getStaticProps() {
  return {
    props: {
      page: {
        title: 'Demo',
      },
    },
  };
}
