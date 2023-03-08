import { useState } from 'react';
import { useListState } from '@mantine/hooks';

import ProgrammeContext, { ProgrammeContextType } from './programme-context';
import type { DayType, ItemType } from '../../@types/programme';

type ProgrammeProviderProps = {
  children: React.ReactNode;
};

export default function ProgrammeProvider({
  children,
}: ProgrammeProviderProps) {
  const [start, setStart] = useState<Date | null>(null);
  const [days, daysHandlers] = useListState<DayType>([]);

  const handleSetStart = (date: Date) => {
    setStart(date);
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
  };

  // day item handlers
  const handleAddDayItem = (dayIndex: number) => {
    daysHandlers.setItemProp(dayIndex, 'items', [
      ...days[dayIndex].items,
      { id: Date.now().toString(), duration: 0 },
    ]);
  };

  const handleChangeDayItemProp = (
    dayIndex: number,
    index: number,
    prop: keyof ItemType,
    value: ItemType[keyof ItemType],
  ) => {
    daysHandlers.setItemProp(
      dayIndex,
      'items',
      days[dayIndex].items.map((item, i) => {
        if (i === index) {
          return { ...item, [prop]: value };
        }
        return item;
      }),
    );
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
    daysHandlers.setItemProp(
      dayIndex,
      'items',
      days[dayIndex].items.filter((_, i) => i !== index),
    );
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
    participants: [],
  };

  return (
    <ProgrammeContext.Provider value={cartContext}>
      {children}
    </ProgrammeContext.Provider>
  );
}
