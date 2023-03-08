import { useContext } from 'react';
import { Button, Group, Stack, createStyles } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { IconCalendar } from '@tabler/icons-react';

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

const Programme = () => {
  const { classes } = useStyles();
  const { days, addDay, conferenceStart, setConferenceStart, save } =
    useContext(ProgrammeContext) as ProgrammeContextType;

  return (
    <Stack>
      <Group position="apart" align="end">
        <DatePicker
          withAsterisk
          label="Start of the conference"
          placeholder="Pick date"
          value={conferenceStart}
          onChange={setConferenceStart}
          icon={<IconCalendar size={16} />}
          clearable={false}
          w="max-content"
        />

        <Button onClick={save} disabled={!conferenceStart}>
          Save programme
        </Button>
      </Group>

      {days.map((day, index) => (
        <Day key={day.id} id={day.id} index={index} day={day} />
      ))}

      <Button
        className={classes.addDayButton}
        onClick={() => {
          if (days.length === 0) {
            if (!conferenceStart) {
              showNotification({
                title: 'Start date is required',
                message: 'Please select the start date of the conference.',
                color: 'red',
              });
              return;
            }
            addDay(new Date(conferenceStart));
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
