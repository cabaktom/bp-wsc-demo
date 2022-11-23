import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { prisma } from '../lib/prisma';

type AbstractsProps = {
  page: PageType;
};

const Abstracts: NextPage<AbstractsProps> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      <Link href="/edit/abstracts">Edit</Link>
      {parse(page.content)}
    </>
  );
};

export default Abstracts;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 4 } });

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
}
