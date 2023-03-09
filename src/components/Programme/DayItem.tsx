import { useContext } from 'react';
import {
  ActionIcon,
  Grid,
  NumberInput,
  Select,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconGripVertical, IconTrash } from '@tabler/icons-react';
import { Draggable } from 'react-beautiful-dnd';

import SelectItem from './SelectItem';
import type { ItemType } from '../../@types/programme';
import ProgrammeContext, {
  type ProgrammeContextType,
} from '../../context/programme/programme-context';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `thin solid ${theme.colors.gray[2]}`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`,
    backgroundColor: theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: '3rem',
    fontWeight: 700,
    width: '6rem',
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

type ProgrammeDayItemProps = {
  dayIndex: number;
  item: ItemType & { index: number };
};

const ProgrammeDayItem = ({
  dayIndex,
  item: { id, index, duration, title, participantId, abstractId },
}: ProgrammeDayItemProps) => {
  const { classes, cx } = useStyles();
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

            <Grid.Col span={10} xs={7} sm={4}>
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

            <Grid.Col span={10} sm={4}>
              <Select
                label="Participant"
                placeholder="Pick a participant"
                value={`${participantId}__${abstractId || 'none'}`}
                onChange={(value) => {
                  const [participantId, abstractId] = value?.split('__') ?? [
                    undefined,
                    undefined,
                  ];

                  changeDayItemParticipantAndAbstract(
                    dayIndex,
                    index,
                    participantId ?? '',
                    !abstractId || abstractId === 'none' ? '' : abstractId,
                  );
                }}
                itemComponent={SelectItem}
                data={participants}
                maxDropdownHeight={400}
                nothingFound="No participant found"
                filter={(value, item) =>
                  item.fullName.toLowerCase().includes(value.toLowerCase()) ||
                  item.abstractTitle
                    ?.toLowerCase()
                    .includes(value.toLowerCase())
                }
                allowDeselect
                searchable
                clearable
                zIndex={1000}
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

export default ProgrammeDayItem;
