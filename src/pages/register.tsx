import type { GetServerSideProps, NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { Paper } from '@mantine/core';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { prisma } from '../lib/prisma';
import RegisterForm from '../components/Form/RegisterForm';

type RegisterPageProps = {
  page: PageType;
};

const RegisterPage: NextPage<RegisterPageProps> = ({ page }) => {
  return (
    <>
      {parse(page?.content ?? '')}

      <Paper mt="5rem">
        <RegisterForm
          participantTitle="Personal data"
          abstractTitle="Your contribution"
          inFormFeedback
        />
      </Paper>
    </>
  );
};

export default RegisterPage;

export const getServerSideProps: GetServerSideProps<RegisterPageProps> = async (
  context,
) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    };
  }

  const page = await prisma.page.findUnique({
    where: { name: `register_${(token.user as User).id}` },
  });
  if (!page) return { notFound: true };

  const settings = await prisma.siteSettings.findMany({
    where: { adminId: (token.user as User).id },
  });

  return {
    props: {
      page,
      settings,
    },
  };
};
