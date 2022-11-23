import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { prisma } from '../lib/prisma';

type TripProps = {
  page: PageType;
};

const Trip: NextPage<TripProps> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      <Link href="/edit/trip">Edit</Link>
      {parse(page.content)}
    </>
  );
};

export default Trip;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 7 } });

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
}
