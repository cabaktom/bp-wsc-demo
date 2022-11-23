import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { prisma } from '../lib/prisma';

type HomeProps = {
  page: PageType;
};

const Home: NextPage<HomeProps> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      <Link href="/edit/home">Edit</Link>
      {parse(page.content)}
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 1 } });

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
}
