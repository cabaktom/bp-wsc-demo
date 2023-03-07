import { useContext } from 'react';
import { Button, Group, Stack, createStyles } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { IconCalendar } from '@tabler/icons-react';
import type { Abstract, Participant } from '@prisma/client';

import Day from './Day';
import ProgrammeContext, {
  type ProgrammeContextType,
} from '../../context/programme/programme-context';

const useStyles = createStyles((theme) => ({
  addDayButton: {
    '&:hover': {
      backgroundColor: theme.colors.gray[1],
    },
  },
}));

type ProgrammeProps = {
  participants: (Participant & { abstract?: Abstract })[];
};

const Programme = ({ participants }: ProgrammeProps) => {
  const { classes } = useStyles();
  const { days, addDay, start, setStart, save } = useContext(
    ProgrammeContext,
  ) as ProgrammeContextType;

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
      <Group position="apart" align="end">
        <DatePicker
          label="Start of the conference"
          placeholder="Pick date"
          value={start}
          onChange={setStart}
          icon={<IconCalendar size={16} />}
          clearable={false}
          w="max-content"
        />

        <Button onClick={save}>Save programme</Button>
      </Group>

      {days.map((day, index) => (
        <Day
          key={day.date.toISOString()}
          index={index}
          day={day}
          participants={participantsParsed}
        />
      ))}

      <Button
        className={classes.addDayButton}
        onClick={() => {
          if (days.length === 0) {
            if (!start) {
              showNotification({
                title: 'Start date is required',
                message: 'Please select the start date of the conference.',
                color: 'red',
              });
              return;
            }
            addDay(new Date(start));
          } else {
            const nextDay = new Date(days[days.length - 1].date);
            nextDay.setDate(nextDay.getDate() + 1);
            addDay(nextDay);
          }
        }}
        fullWidth
        variant="default"
        h="18rem"
        fz={18}
        opacity={0.7}
        bg="gray.0"
      >
        Add day
      </Button>
    </Stack>
  );
};

export default Programme;
