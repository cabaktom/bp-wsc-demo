import { createContext } from 'react';
import type { Abstract, Participant } from '@prisma/client';

import type { DayType, ItemType } from '../../@types/programme.d';

export type ProgrammeContextType = {
  start: Date | null;
  setStart: (date: Date) => void;

  days: DayType[];
  addDay: (date: Date) => void;
  changeDayProp: (
    index: number,
    prop: keyof DayType,
    value: DayType[keyof DayType],
  ) => void;
  deleteDay: (index: number) => void;

  addDayItem: (dayIndex: number) => void;
  changeDayItemProp: (
    dayIndex: number,
    index: number,
    prop: keyof ItemType,
    value: ItemType[keyof ItemType],
  ) => void;
  dayItemReorder: (dayIndex: number, from: number, to: number) => void;
  deleteDayItem: (dayIndex: number, index: number) => void;

  participants: (Participant & { abstract?: Abstract })[];
  save: () => void;
};

export default createContext<ProgrammeContextType | null>(null);
