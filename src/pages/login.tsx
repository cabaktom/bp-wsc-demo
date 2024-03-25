import type { GetServerSideProps, NextPage } from 'next';
import { Paper, Title, createStyles } from '@mantine/core';
import { getToken } from 'next-auth/jwt';
import { User } from 'next-auth';

import LoginForm from '../components/Form/LoginForm';
import { prisma } from '../lib/prisma';

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
}));

const LogInPage: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.inner}>
        <Title order={3} align="center">
          Log in as an administrator
        </Title>

        <Paper>
          <LoginForm />
        </Paper>
      </div>
    </>
  );
};

export default LogInPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    };
  }

  const settings = await prisma.siteSettings.findMany({
    where: { adminId: (token.user as User).id },
  });

  return {
    props: {
      page: {
        title: 'Log in',
      },
      settings,
    },
  };
};
