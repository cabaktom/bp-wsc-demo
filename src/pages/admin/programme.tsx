import { GetServerSideProps } from 'next';
import type { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

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
  return (
    <AdminLayout settings={page.props.settings} title={page.props.title}>
      {page}
    </AdminLayout>
  );
};

export default ProgrammePage;

export const getServerSideProps: GetServerSideProps<
  ProgrammePageProps
> = async (context) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const participants = await prisma.participant.findMany({
    where: {
      adminId: {
        equals: (token.user as User).id,
        not: null,
      },
    },
    include: {
      abstract: true,
    },
  });
  const settings = await prisma.siteSettings.findMany({
    where: { adminId: (token.user as User).id },
  });

  // parse participants to the format that is used in the select input
  const programmeParticipants = participants
    .map((p) => {
      const {
        id,
        fullName,
        invited,
        participation,
        additionalMessage,
        abstract,
      } = p;
      const participant: ParticipantType = {
        id,
        fullName,
        abstractTitle: abstract?.title,
        value: `${id}__${abstract?.id ?? 'none'}`,
        label: `${fullName} - ${abstract?.title ?? 'No abstract'}`,
        group: invited
          ? '1. Invited'
          : abstract
          ? '2. Presenting'
          : '3. No abstract',
        invited,
        participation,
        message: additionalMessage,
      };

      return participant;
    })
    .sort((a, b) => a.group.localeCompare(b.group));

  return {
    props: {
      participants: JSON.parse(JSON.stringify(programmeParticipants)),
      title: 'Edit programme',
      settings,
    },
  };
};
