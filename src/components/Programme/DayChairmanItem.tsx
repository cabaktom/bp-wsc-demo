import { useContext } from 'react';
import { ActionIcon, Group, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconGripVertical, IconTrash } from '@tabler/icons-react';
import { Draggable } from 'react-beautiful-dnd';

import type { ChairmanItemType } from '../../@types/programme';
import ProgrammeContext, {
  type ProgrammeContextType,
} from '../../context/programme/programme-context';
import ParticipantSelect from './ParticipantSelect';

import useStyles from './DayItem.styles';

type DayChairmanItemProps = {
  dayIndex: number;
  item: ChairmanItemType & { index: number };
};

const DayChairmanItem = ({
  dayIndex,
  item: { id, index, participantId, abstractId },
}: DayChairmanItemProps) => {
  const { classes, cx } = useStyles({ backgroundColor: 'materialBlue' });
  const { deleteDayItem, changeDayItemParticipantAndAbstract, participants } =
    useContext(ProgrammeContext) as ProgrammeContextType;

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

          <Group position="apart" w="100%" my="xs" noWrap spacing={0}>
            <ParticipantSelect
              label="Chairman"
              placeholder="Pick a chairman"
              emptyPlaceholder="No chairman found"
              setData={changeDayItemParticipantAndAbstract.bind(
                null,
                dayIndex,
                index,
              )}
              data={participants}
              participantId={participantId}
              abstractId={abstractId}
              w={{ base: '100%', md: '60%' }}
            />

            <ActionIcon
              m="xs"
              title="Delete chairman"
              onClick={() => {
                const participant = participants.find(
                  (p) => p.id === participantId,
                );

                if (!participant) {
                  deleteDayItem(dayIndex, index);
                  return;
                }
                openConfirmModal({
                  title: 'Delete chairman',
                  children: (
                    <Text size="sm">
                      Are you sure you want to delete chairman &apos;
                      {participant.fullName}&apos;?
                    </Text>
                  ),
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
          </Group>
        </div>
      )}
    </Draggable>
  );
};

export default DayChairmanItem;
