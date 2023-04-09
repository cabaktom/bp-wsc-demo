import { createContext } from 'react';

import { DayType, ItemType, ParticipantType } from '../../@types/programme.d';

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

  addDayItem: (dayIndex: number, type: 'ITEM' | 'CHAIRMAN') => void;
  changeDayItemProp: (
    dayIndex: number,
    index: number,
    prop: keyof ItemType,
    value: ItemType[keyof ItemType],
  ) => void;
  changeDayItemParticipantAndAbstract: (
    dayIndex: number,
    index: number,
    participantId: string,
    abstractId: string,
  ) => void;
  dayItemReorder: (dayIndex: number, from: number, to: number) => void;
  deleteDayItem: (dayIndex: number, index: number) => void;

  participants: ParticipantType[];
  saveProgramme: () => void;
  deleteProgramme: () => void;
  loading: boolean;
  saving: boolean;
  deleting: boolean;
};

export default createContext<ProgrammeContextType | null>(null);
