import type { Abstract, Participant } from '@prisma/client';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import { prisma } from '../../lib/prisma';
import Programme from '../../components/Programme/Programme';
import ProgrammeProvider from '../../context/programme/ProgrammeProvider';

type ProgrammePageProps = {
  participants: (Participant & {
    abstract?: Abstract;
  })[];
};

const ProgrammePage: NextPageWithLayout<ProgrammePageProps> = ({
  participants,
}) => {
  return (
    <ProgrammeProvider>
      <Programme participants={participants} />
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

  return {
    props: {
      participants: JSON.parse(JSON.stringify(participants)),
    },
  };
}
