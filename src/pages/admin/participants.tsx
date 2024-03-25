import { SWRConfig } from 'swr';
import { Paper, Stack } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import type { Abstract, Participant } from '@prisma/client';
import { GetServerSideProps } from 'next';
import type { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import ParticipantsDataTable from '../../components/Table/ParticipantsDataTable';
import { prisma } from '../../lib/prisma';
import RegisterForm from '../../components/Form/RegisterForm';

type ParticipantsPageProps = {
  fallback: {
    '/api/participants': (Participant & {
      abstract: Abstract;
    })[];
  };
};

const ParticipantsPage: NextPageWithLayout<ParticipantsPageProps> = ({
  fallback,
}) => {
  const { ref, width } = useElementSize();

  return (
    <SWRConfig value={{ fallback }}>
      <Stack spacing="md" ref={ref}>
        <Paper>
          <RegisterForm
            participantTitle="New participant"
            abstractTitle="New contribution"
            withInvited
          />
        </Paper>

        <ParticipantsDataTable expandWidth={width} />
      </Stack>
    </SWRConfig>
  );
};

ParticipantsPage.getLayout = (page) => {
  return (
    <AdminLayout settings={page.props.settings} title={page.props.title}>
      {page}
    </AdminLayout>
  );
};

export default ParticipantsPage;

export const getServerSideProps: GetServerSideProps<
  ParticipantsPageProps
> = async (context) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    };
  }

  const participants = await prisma.participant.findMany({
    where: { adminId: (token.user as User).id },
    include: {
      abstract: true,
    },
  });
  const settings = await prisma.siteSettings.findMany({
    where: { adminId: (token.user as User).id },
  });

  return {
    props: {
      fallback: {
        '/api/participants': JSON.parse(JSON.stringify(participants)),
      },
      title: 'Edit participants',
      settings,
    },
  };
};
