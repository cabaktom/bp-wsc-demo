import { useState } from 'react';
import { useListState } from '@mantine/hooks';

import ProgrammeContext, { ProgrammeContextType } from './programme-context';
import type {
  DayType,
  ItemType,
  ParticipantType,
} from '../../@types/programme';

type ProgrammeProviderProps = {
  children: React.ReactNode;
  participants: ParticipantType[];
};

export default function ProgrammeProvider({
  children,
  participants: participantsProp,
}: ProgrammeProviderProps) {
  const [start, setStart] = useState<Date | null>(null);
  const [days, daysHandlers] = useListState<DayType>([]);
  const [participants] = useListState<ParticipantType>(participantsProp);

  const recalculateDates = (start: Date) => {
    daysHandlers.apply((day, index = 0) => {
      const nextDay = new Date(start);
      nextDay.setDate(nextDay.getDate() + index);

      return {
        ...day,
        date: nextDay,
      };
    });
  };

  const recalculateDayEndTimes = (dayIndex: number, items: ItemType[]) => {
    const dayStart = days[dayIndex].start;
    if (!dayStart) return;

    const endTime = items.reduce((acc, { duration }) => {
      const itemEndTime = new Date(acc);
      return new Date(itemEndTime.getTime() + duration * 60 * 1000);
    }, dayStart);

    daysHandlers.setItemProp(dayIndex, 'end', endTime);
  };

  const handleSetStart = (date: Date) => {
    setStart(date);
    recalculateDates(date);
  };

  // day handlers
  const handleAddDay = (start: Date) => {
    daysHandlers.append({
      id: Date.now().toString(),
      date: new Date(start),
      items: [],
    });
  };

  const handleChangeDayProp = (
    index: number,
    prop: keyof DayType,
    value: DayType[keyof DayType],
  ) => {
    daysHandlers.setItemProp(index, prop, value);
  };

  const handleDeleteDay = (index: number) => {
    daysHandlers.remove(index);

    if (!start) return;
    recalculateDates(start);
  };

  // day item handlers
  const handleAddDayItem = (dayIndex: number) => {
    const items = [
      ...days[dayIndex].items,
      { id: Date.now().toString(), duration: 0, title: '' },
    ];
    daysHandlers.setItemProp(dayIndex, 'items', items);

    recalculateDayEndTimes(dayIndex, items);
  };

  const handleChangeDayItemProp = (
    dayIndex: number,
    index: number,
    prop: keyof ItemType,
    value: ItemType[keyof ItemType],
  ) => {
    const items = days[dayIndex].items.map((item, i) => {
      if (i === index) {
        return { ...item, [prop]: value };
      }
      return item;
    });
    daysHandlers.setItemProp(dayIndex, 'items', items);

    if (prop === 'duration') {
      recalculateDayEndTimes(dayIndex, items);
    }
  };

  const handleDayItemReorder = (dayIndex: number, from: number, to: number) => {
    const current = days[dayIndex].items;

    const cloned = [...current];
    const item = current[from];

    cloned.splice(from, 1);
    cloned.splice(to, 0, item);

    daysHandlers.setItemProp(dayIndex, 'items', cloned);
  };

  const handleDeleteDayItem = (dayIndex: number, index: number) => {
    const items = days[dayIndex].items.filter((_, i) => i !== index);

    daysHandlers.setItemProp(dayIndex, 'items', items);

    recalculateDayEndTimes(dayIndex, items);
  };

  const handleSave = () => {
    // TODO: save programme to database
    console.log(days, start);
  };

  const cartContext: ProgrammeContextType = {
    start,
    setStart: handleSetStart,

    days,
    addDay: handleAddDay,
    changeDayProp: handleChangeDayProp,
    deleteDay: handleDeleteDay,

    addDayItem: handleAddDayItem,
    changeDayItemProp: handleChangeDayItemProp,
    dayItemReorder: handleDayItemReorder,
    deleteDayItem: handleDeleteDayItem,

    save: handleSave,
    participants,
  };

  return (
    <ProgrammeContext.Provider value={cartContext}>
      {children}
    </ProgrammeContext.Provider>
  );
}
