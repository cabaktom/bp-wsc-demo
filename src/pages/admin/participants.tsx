import { Stack } from '@mantine/core';
import type { Abstract, Participant } from '@prisma/client';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import ParticipantsDataTable from '../../components/Table/ParticipantsDataTable';
import { prisma } from '../../lib/prisma';

type ParticipantsPageProps = {
  participants: (Participant & {
    abstract: Abstract;
  })[];
};

const ParticipantsPage: NextPageWithLayout<ParticipantsPageProps> = ({
  participants,
}) => {
  return (
    <>
      <Stack spacing="md">
        <ParticipantsDataTable participants={participants} />
      </Stack>
    </>
  );
};

ParticipantsPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default ParticipantsPage;

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
