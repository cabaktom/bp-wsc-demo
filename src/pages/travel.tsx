import type { NextPage } from 'next';
import Link from 'next/link';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../lib/prisma';

type TravelPageProps = {
  page: PageType;
};

const TravelPage: NextPage<TravelPageProps> = ({ page }) => {
  return (
    <>
      <Link href="/edit/travel">Edit</Link>
      {parse(page.content)}
    </>
  );
};

export default TravelPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 6 } });
  const settings = await prisma.siteSettings.findMany();

  return {
    props: {
      page,
      settings,
    },
  };
}
