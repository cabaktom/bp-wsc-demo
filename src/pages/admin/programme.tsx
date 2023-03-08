import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import { prisma } from '../../lib/prisma';
import Programme from '../../components/Programme/Programme';
import ProgrammeProvider from '../../context/programme/ProgrammeProvider';
import type { ParticipantType } from '../../@types/programme';

type ProgrammePageProps = {
  participants: ParticipantType[];
};

const ProgrammePage: NextPageWithLayout<ProgrammePageProps> = ({
  participants,
}) => {
  return (
    <ProgrammeProvider participants={participants}>
      <Programme />
    </ProgrammeProvider>
  );
};

ProgrammePage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default ProgrammePage;

export async function getServerSideProps() {
  const participants = await prisma.participant.findMany({
    include: {
      abstract: true,
    },
  });

  // parse participants to the format that is used in the select input
  const programmeParticipants = participants
    .map((participant) => ({
      id: participant.id,
      fullName: participant.fullName,
      abstractTitle: participant.abstract?.title,
      value: participant.id,
      label: `${participant.fullName} - ${
        participant.abstract?.title ?? 'No abstract'
      }`,
      group: participant.invited
        ? '1. Invited'
        : participant.abstract
        ? '2. Presenting'
        : '3. No abstract',
    }))
    .sort((a, b) => a.group.localeCompare(b.group));

  return {
    props: {
      participants: JSON.parse(JSON.stringify(programmeParticipants)),
    },
  };
}
