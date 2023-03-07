import { Button, Paper } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DayItem from './DayItem';
import type { ItemType, ParticipantType } from '../../@types/programme';

type ProgrammeDayProps = {
  date: Date;
  start: Date;
  end: Date;
  items: ItemType[];
  participants: ParticipantType[];
};

const ProgrammeDay = ({
  date,
  start,
  end,
  items,
  participants,
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

  return (
    <Paper p={{ base: 'sm', xs: 'md' }}>
      <h3>{date.toLocaleDateString()}</h3>
      <strong>
        {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
      </strong>

      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handlers.reorder({ from: source.index, to: destination?.index || 0 })
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
        onClick={() => handlers.append({ id: Date.now().toString() })}
        fullWidth
        variant="outline"
      >
        Add item
      </Button>
    </Paper>
  );
};

export default ProgrammeDay;
