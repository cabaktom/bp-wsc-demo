import type { NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page } from '@prisma/client';

import { prisma } from '../lib/prisma';
import { PROGRAMME_ID } from '../constants/programme';
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

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { name: 'programme' } });
  const settings = await prisma.siteSettings.findMany();
  const programme = await prisma.programme.findUnique({
    where: { id: PROGRAMME_ID },
    include: {
      days: {
        include: {
          items: true,
        },
      },
    },
  });
  const participants = await prisma.participant.findMany();
  const abstracts = await prisma.abstract.findMany();

  // merge programme and participants
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
}
