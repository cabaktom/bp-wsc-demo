import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { prisma } from '../lib/prisma';

type ProgrammeProps = {
  page: PageType;
};

const Programme: NextPage<ProgrammeProps> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      <Link href="/edit/programme">Edit</Link>
      {parse(page.content)}
    </>
  );
};

export default Programme;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 5 } });

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
}
