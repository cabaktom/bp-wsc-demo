import type { NextPage } from 'next';
import Head from 'next/head';
import { Title } from '@mantine/core';
import parse from 'html-react-parser';
import type { Abstract, Page, Participant } from '@prisma/client';

import { prisma } from '../lib/prisma';
import MyPaper from '../components/Layout/MyPaper';

type ParticipantsPageProps = {
  page: Page;
  participants: (Participant & {
    abstract: Abstract | null;
  })[];
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
        {participants.map(({ abstract, ...participant }) => (
          <li key={participant.fullName}>
            <strong>{participant.fullName}</strong> {participant.affiliation}{' '}
            {abstract && (
              <div key={abstract.id} id={abstract.id.toString()}>
                <MyPaper>
                  <Title order={5}>{abstract.title}</Title>
                  <p>{abstract.additionalAuthors}</p>
                  <p>{abstract.affiliationAuthors}</p>
                  <strong>Abstract:</strong>
                  <p>{abstract.abstract}</p>
                </MyPaper>
              </div>
            )}
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
    include: {
      abstract: true,
    },
  });

  return {
    props: {
      page,
      settings,
      participants: JSON.parse(JSON.stringify(participants)),
    },
  };
}
