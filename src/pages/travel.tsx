import type { GetServerSideProps, NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { User } from 'next-auth';

import { prisma } from '../lib/prisma';

type TravelPageProps = {
  page: PageType;
};

const TravelPage: NextPage<TravelPageProps> = ({ page }) => {
  return <>{parse(page?.content ?? '')}</>;
};

export default TravelPage;

export const getServerSideProps: GetServerSideProps<TravelPageProps> = async (
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
    where: { name: `travel_${(token.user as User).id}` },
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
