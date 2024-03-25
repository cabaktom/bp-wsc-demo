import { GetServerSideProps, NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { prisma } from '../lib/prisma';

type HomePageProps = {
  page: PageType;
};

const HomePage: NextPage<HomePageProps> = ({ page }) => {
  return <>{parse(page?.content ?? '')}</>;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
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
    where: { name: `home_${(token.user as User).id}` },
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
