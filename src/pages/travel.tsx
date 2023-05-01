import type { NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../lib/prisma';

type TravelPageProps = {
  page: PageType;
};

const TravelPage: NextPage<TravelPageProps> = ({ page }) => {
  return <>{parse(page?.content ?? '')}</>;
};

export default TravelPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { name: 'travel' } });
  const settings = await prisma.siteSettings.findMany();

  return {
    props: {
      page,
      settings,
    },
    revalidate: 1,
  };
}
