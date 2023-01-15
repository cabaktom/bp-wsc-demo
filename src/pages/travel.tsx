import type { NextPage } from 'next';
import Head from 'next/head';
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
      <Head>
        <title>{page.title}</title>
      </Head>

      <Link href="/edit/travel">Edit</Link>
      {parse(page.content)}
    </>
  );
};

export default TravelPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 6 } });

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
}
