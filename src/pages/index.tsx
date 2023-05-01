import { NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../lib/prisma';

type HomePageProps = {
  page: PageType;
};

const HomePage: NextPage<HomePageProps> = ({ page }) => {
  return <>{parse(page?.content ?? '')}</>;
};

export default HomePage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { name: 'home' } });
  const settings = await prisma.siteSettings.findMany();

  return {
    props: {
      page,
      settings,
    },
    revalidate: 1,
  };
}
