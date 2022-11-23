import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { prisma } from '../lib/prisma';

type ParticipantsProps = {
  page: PageType;
};

const Participants: NextPage<ParticipantsProps> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      <Link href="/edit/participants">Edit</Link>
      {parse(page.content)}
    </>
  );
};

export default Participants;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 3 } });

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
}
