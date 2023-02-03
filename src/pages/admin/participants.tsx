import { SWRConfig } from 'swr';
import { Stack, Title } from '@mantine/core';
import type { Abstract, Participant } from '@prisma/client';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import ParticipantsDataTable from '../../components/Table/ParticipantsDataTable';
import { prisma } from '../../lib/prisma';
import RegisterForm from '../../components/Form/RegisterForm';
import Paper from '../../components/Layout/Paper';

type ParticipantsPageProps = {
  fallback: {
    '/api/participants?abstract=true': (Participant & {
      abstract: Abstract;
    })[];
  };
};

const ParticipantsPage: NextPageWithLayout<ParticipantsPageProps> = ({
  fallback,
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Stack spacing="md">
        <Paper>
          <Title order={4}>New participant</Title>
          <RegisterForm />
        </Paper>

        <ParticipantsDataTable />
      </Stack>
    </SWRConfig>
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
      fallback: {
        '/api/participants': JSON.parse(JSON.stringify(participants)),
      },
    },
  };
}
