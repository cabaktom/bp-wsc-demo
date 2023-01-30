import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../lib/prisma';

type ParticipantsPageProps = {
  page: PageType;
  participants: {
    fullName: string;
    affiliation: string;
    abstract: {
      id: number;
    };
  }[];
};

const ParticipantsPage: NextPage<ParticipantsPageProps> = ({
  page,
  participants,
}) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      {parse(page.content)}

      <ul>
        {participants.map((participant) => (
          <li key={participant.fullName}>
            <strong>{participant.fullName}</strong> {participant.affiliation}{' '}
            <Link href={`/abstracts#${participant.abstract.id}`}>Abstract</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ParticipantsPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 3 } });
  const settings = await prisma.siteSettings.findMany();
  const participants = await prisma.participant.findMany({
    select: {
      fullName: true,
      affiliation: true,
      abstract: {
        select: {
          id: true,
        },
      },
    },
  });

  return {
    props: {
      page,
      settings,
      participants,
    },
  };
}
