import type { NextPage } from 'next';
import parse from 'html-react-parser';
import type { Abstract, Page, Participant } from '@prisma/client';

import { prisma } from '../lib/prisma';
import ParticipantList from '../components/List/ParticipantList';

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
      {parse(page.content)}

      <ParticipantList participants={participants} />
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
