import { useContext } from 'react';
import { ActionIcon, Button, Group, Paper, Stack, Text } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconClock, IconTrash } from '@tabler/icons-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DayItem from './DayItem';
import type { DayType } from '../../@types/programme';
import ProgrammeContext, {
  type ProgrammeContextType,
} from '../../context/programme/programme-context';
import RTE from '../Editor/RTE';

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
  const { changeDayProp, deleteDay, addDayItem, dayItemReorder } = useContext(
    ProgrammeContext,
  ) as ProgrammeContextType;

  const draggableItems = items.map((item, itemIndex) => (
    <DayItem
      key={item.id}
      dayIndex={index}
      item={{ ...item, index: itemIndex }}
    />
  ));

  const formattedDate = date.toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Paper p={{ base: 'sm', xs: 'md' }}>
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

        <Button
          onClick={() => {
            if (!start) {
              showNotification({
                title: 'Start time is required',
                message: 'Please set start time first',
                color: 'red',
              });
              return;
            }
            addDayItem(index);
          }}
          fullWidth
          variant="outline"
        >
          Add item
        </Button>
      </Stack>
    </Paper>
  );
};

export default ProgrammeDay;
