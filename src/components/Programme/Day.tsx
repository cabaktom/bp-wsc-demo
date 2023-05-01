import { useContext } from 'react';
import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { openConfirmModal } from '@mantine/modals';
import { IconClock, IconTrash } from '@tabler/icons-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DayItem from './DayItem';
import DayChairmanItem from './DayChairmanItem';
import ProgrammeContext, {
  type ProgrammeContextType,
} from '../../context/programme/programme-context';
import RTE from '../Editor/RTE';
import { DayType } from '../../@types/programme';

type ProgrammeDayProps = {
  id: string;
  index: number;
  day: DayType;
};

const ProgrammeDay = ({
  id,
  index,
  day: { start, date, end, items, additionalInfo },
}: ProgrammeDayProps) => {
  const theme = useMantineTheme();
  const { changeDayProp, deleteDay, addDayItem, dayItemReorder } = useContext(
    ProgrammeContext,
  ) as ProgrammeContextType;

  const draggableItems = items.map((item, itemIndex) => {
    if (item.type === 'CHAIRMAN') {
      return (
        <DayChairmanItem
          key={item.id}
          dayIndex={index}
          item={{ ...item, index: itemIndex }}
        />
      );
    }
    return (
      <DayItem
        key={item.id}
        dayIndex={index}
        item={{ ...item, index: itemIndex }}
      />
    );
  });

  const formattedDate = date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Paper
      p={{ base: 'sm', xs: 'md' }}
      sx={{ borderColor: theme.colors[theme.primaryColor][3] }}
    >
      <Stack spacing="xs">
        <Group position="apart" mb="xs">
          <Text fz={24}>{formattedDate}</Text>

          <ActionIcon
            m="xs"
            title="Delete day"
            onClick={() => {
              openConfirmModal({
                title: 'Delete day',
                children: (
                  <Text size="sm">
                    Are you sure you want to delete day {formattedDate}?
                  </Text>
                ),
                labels: { confirm: 'Delete', cancel: 'Cancel' },
                confirmProps: {
                  color: 'red',
                },
                onConfirm: () => deleteDay(index),
              });
            }}
          >
            <IconTrash size={20} color="red" />
          </ActionIcon>
        </Group>

        <RTE
          content={additionalInfo}
          setContent={changeDayProp.bind(null, index, 'additionalInfo')}
          placeholder="Additional info"
          hideToolbar
        />

        <Group spacing="xs">
          <TimeInput
            label="Start"
            value={start}
            onChange={(value) => changeDayProp(index, 'start', value)}
            icon={<IconClock size={16} />}
            w="min-content"
          />

          <TimeInput
            label="End"
            value={end}
            disabled
            icon={<IconClock size={16} />}
            w="min-content"
          />
        </Group>

        <DragDropContext
          onDragEnd={({ destination, source }) =>
            dayItemReorder(index, source.index, destination?.index || 0)
          }
        >
          <Droppable droppableId={id} direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {draggableItems}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Group spacing="xs" mx="auto">
          <Button
            onClick={() => addDayItem(index, 'ITEM')}
            variant="outline"
            bg="white"
          >
            Add item
          </Button>

          <Button
            onClick={() => addDayItem(index, 'CHAIRMAN')}
            variant="outline"
            bg="white"
          >
            Add chairman
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export default ProgrammeDay;
