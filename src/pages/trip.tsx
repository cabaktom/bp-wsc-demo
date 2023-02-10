import type { NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../lib/prisma';

type TripPageProps = {
  page: PageType;
};

const TripPage: NextPage<TripPageProps> = ({ page }) => {
  return <>{parse(page.content)}</>;
};

export default TripPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 7 } });
  const settings = await prisma.siteSettings.findMany();

  return {
    props: {
      page,
      settings,
    },
  };
}
