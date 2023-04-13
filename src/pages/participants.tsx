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
  const participantsWithLastName = participants.map((participant) => ({
    ...participant,
    lastName: participant.fullName.slice(
      participant.fullName.lastIndexOf(' ') + 1,
    ),
  }));

  return (
    <>
      {parse(page?.content ?? '')}

      <ParticipantList participants={participantsWithLastName} />
    </>
  );
};

export default ParticipantsPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { name: 'participants' } });
  const settings = await prisma.siteSettings.findMany();
  const participants = await prisma.participant.findMany({
    include: {
      abstract: true,
    },
  });

  // initially sort participants by last name
  const sortedParticipants = participants.sort((a, b) => {
    const aLastName = a.fullName.slice(a.fullName.lastIndexOf(' ') + 1);
    const bLastName = b.fullName.slice(b.fullName.lastIndexOf(' ') + 1);

    return aLastName.localeCompare(bLastName);
  });

  return {
    props: {
      page,
      settings,
      participants: JSON.parse(JSON.stringify(sortedParticipants)),
    },
    revalidate: 5,
  };
}
