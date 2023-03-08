import { createContext } from 'react';

import type {
  DayType,
  ItemType,
  ParticipantType,
} from '../../@types/programme.d';

export type ProgrammeContextType = {
  conferenceStart: Date | null;
  setConferenceStart: (date: Date) => void;

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

  participants: ParticipantType[];
  save: () => void;
};

export default createContext<ProgrammeContextType | null>(null);
