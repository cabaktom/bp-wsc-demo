import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../lib/prisma';

type ProgrammePageProps = {
  page: PageType;
};

const ProgrammePage: NextPage<ProgrammePageProps> = ({ page }) => {
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

export default ProgrammePage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 5 } });

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
}
