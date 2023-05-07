import { useContext } from 'react';
import { ActionIcon, Grid, NumberInput, Text, TextInput } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconGripVertical, IconTrash } from '@tabler/icons-react';
import { Draggable } from 'react-beautiful-dnd';

import type { ItemType } from '../../@types/programme';
import ParticipantSelect from './ParticipantSelect';
import ProgrammeContext, {
  type ProgrammeContextType,
} from '../../context/programme/programme-context';

import useStyles from './DayItem.styles';

type DayItemProps = {
  dayIndex: number;
  item: ItemType & { index: number };
};

const DayItem = ({
  dayIndex,
  item: { id, index, duration, title, participantId, abstractId },
}: DayItemProps) => {
  const { classes, cx } = useStyles({});
  const {
    deleteDayItem,
    changeDayItemProp,
    changeDayItemParticipantAndAbstract,
    participants,
  } = useContext(ProgrammeContext) as ProgrammeContextType;

  return (
    <Draggable key={id} index={index} draggableId={id}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={20} stroke={1.5} />
          </div>

          <Grid my="xs" gutter="xs" columns={10} w="100%">
            <Grid.Col span={10} xs={3} sm={2}>
              <NumberInput
                label="Duration (min)"
                value={duration}
                onChange={(value) =>
                  changeDayItemProp(dayIndex, index, 'duration', value)
                }
                min={0}
              />
            </Grid.Col>

            <Grid.Col span={10} xs={7} sm={3}>
              <TextInput
                label="Title"
                placeholder='e.g. "Keynote: ..."'
                value={title}
                onChange={(value) =>
                  changeDayItemProp(
                    dayIndex,
                    index,
                    'title',
                    value.target.value,
                  )
                }
              />
            </Grid.Col>

            <Grid.Col span={10} sm={5}>
              <ParticipantSelect
                label="Participant"
                placeholder="Pick a participant"
                emptyPlaceholder="No participant found"
                setData={changeDayItemParticipantAndAbstract.bind(
                  null,
                  dayIndex,
                  index,
                )}
                data={participants}
                participantId={participantId}
                abstractId={abstractId}
              />
            </Grid.Col>
          </Grid>

          <ActionIcon
            m="xs"
            title="Delete item"
            onClick={() => {
              const participant = participants.find(
                (p) => p.id === participantId,
              );

              const message = `Are you sure you want to delete ${
                title
                  ? `'${title}' item?`
                  : participant
                  ? `item with '${participant.fullName}'?`
                  : 'this item?'
              }`;
              if (!title && !participantId) {
                deleteDayItem(dayIndex, index);
                return;
              }
              openConfirmModal({
                title: 'Delete item',
                children: <Text size="sm">{message}</Text>,
                labels: { confirm: 'Delete', cancel: 'Cancel' },
                confirmProps: {
                  color: 'red',
                },
                onConfirm: () => deleteDayItem(dayIndex, index),
              });
            }}
          >
            <IconTrash size={20} color="red" />
          </ActionIcon>
        </div>
      )}
    </Draggable>
  );
};

export default DayItem;
