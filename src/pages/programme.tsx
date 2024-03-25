import type { GetServerSideProps, NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page } from '@prisma/client';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { prisma } from '../lib/prisma';
import ProgrammeList, {
  ChairmanItem,
  Item,
} from '../components/List/ProgrammeList';
import type { DayType, ProgrammeType } from '../@types/programme';

type ProgrammePageProps = {
  page: Page;
  programme: ProgrammeType & {
    days: (DayType & {
      items: (Item | ChairmanItem)[];
    })[];
  };
};

const ProgrammePage: NextPage<ProgrammePageProps> = ({ page, programme }) => {
  return (
    <>
      {parse(page?.content ?? '')}

      <ProgrammeList programme={programme} />
    </>
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
        destination: 'login',
        permanent: false,
      },
    };
  }

  const page = await prisma.page.findUnique({
    where: { name: `programme_${(token.user as User).id}` },
  });
  if (!page) return { notFound: true };

  const settings = await prisma.siteSettings.findMany({
    where: { adminId: (token.user as User).id },
  });
  const programme = await prisma.programme.findUnique({
    where: { id: `programme_${(token.user as User).id}` },
    include: {
      days: {
        include: {
          items: true,
        },
      },
    },
  });
  const participants = await prisma.participant.findMany({
    where: { adminId: (token.user as User).id },
    include: {
      abstract: true,
    },
  });
  const abstracts = await prisma.abstract.findMany({
    where: { participant: { adminId: (token.user as User).id } },
  });

  // merge programme days and participants (programme includes only IDs)
  const programmeWithParticipants = programme?.days.map((day) => {
    let dayStartTime = new Date(day.start!);

    const items = day.items.map((item) => {
      const itemStartTime = new Date(dayStartTime.getTime());
      dayStartTime = new Date(dayStartTime.getTime() + item.duration * 60000);

      return {
        ...item,
        participant: participants.find(
          (participant) => participant.id === item.participantId,
        ),
        abstract: abstracts.find((abstract) => abstract.id === item.abstractId),
        startTime: itemStartTime,
        endTime: dayStartTime,
      };
    });

    return {
      ...day,
      items,
    };
  });

  return {
    props: {
      page,
      settings,
      programme: JSON.parse(
        JSON.stringify({
          ...programme,
          days: programmeWithParticipants,
        }),
      ),
    },
  };
};
