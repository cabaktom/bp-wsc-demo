import { Stack } from '@mantine/core';
import type { Abstract, Participant } from '@prisma/client';

import Day from './Day';
import type { ItemType } from '../../@types/programme';

type DayType = {
  date: Date;
  start: Date;
  end: Date;
  items: ItemType[];
};

const days: Array<DayType> = [
  {
    date: new Date('2021-09-01'),
    start: new Date(0, 0, 0, 9, 0),
    end: new Date(0, 0, 0, 17, 0),
    items: [],
  },
  {
    date: new Date('2021-09-02'),
    start: new Date(0, 0, 0, 9, 0),
    end: new Date(0, 0, 0, 17, 0),
    items: [],
  },
];

type ProgrammeProps = {
  participants: (Participant & { abstract?: Abstract })[];
};

const Programme = ({ participants }: ProgrammeProps) => {
  const participantsParsed = participants
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

  return (
    <Stack>
      {days.map((day) => (
        <Day
          key={day.date.toISOString()}
          {...day}
          participants={participantsParsed}
        />
      ))}
    </Stack>
  );
};

export default Programme;
