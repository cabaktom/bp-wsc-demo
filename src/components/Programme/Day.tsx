import { ActionIcon, Button, Group, Paper, Stack, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { TimeInput } from '@mantine/dates';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconClock, IconTrash } from '@tabler/icons-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DayItem from './DayItem';
import { DayType, ParticipantType } from '../../@types/programme';

type ProgrammeDayProps = {
  index: number;
  day: DayType;
  participants: ParticipantType[];
  setItemProp: (prop: keyof DayType, value: DayType[keyof DayType]) => void;
  deleteItem: () => void;
};

const ProgrammeDay = ({
  day: { date, start, end, items },
  participants,
  setItemProp,
  deleteItem,
}: ProgrammeDayProps) => {
  const [state, handlers] = useListState(items);

  const draggableItems = state.map((item, index) => (
    <DayItem
      key={item.id}
      item={{ ...item, index }}
      participants={participants}
      setItemProp={handlers.setItemProp}
      deleteItem={handlers.remove.bind(null, index)}
    />
  ));

  const formattedDate = date.toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Paper p={{ base: 'sm', xs: 'md' }}>
      <Group position="apart" mb="xs">
        <Text fz={24}>{formattedDate}</Text>

        <ActionIcon
          m="xs"
          title="Delete day"
          onClick={() => {
            openConfirmModal({
              title: 'Delete item',
              children: (
                <Text size="sm">
                  Are you sure you want to delete day {formattedDate}?
                </Text>
              ),
              labels: { confirm: 'Delete', cancel: 'Cancel' },
              confirmProps: {
                color: 'red',
              },
              onConfirm: () => deleteItem(),
            });
          }}
        >
          <IconTrash size={20} color="red" />
        </ActionIcon>
      </Group>

      <Stack spacing="xs">
        <Group spacing="xs">
          <TimeInput
            label="Start"
            value={start}
            onChange={(value) => setItemProp('start', value)}
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
            handlers.reorder({
              from: source.index,
              to: destination?.index || 0,
            })
          }
        >
          <Droppable droppableId={date.toString()} direction="vertical">
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
            handlers.append({ id: Date.now().toString(), duration: 0 });
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
