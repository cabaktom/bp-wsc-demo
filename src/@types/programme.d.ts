export type ItemType = {
  id: string;
  index?: number;
  duration?: number;
  title?: string;
  participantId?: string;
  abstractId?: string;
};

export type ParticipantType = {
  id: string;
  value: string;
  label: string;
  fullName: string;
  abstractTitle?: string;
  group: string;
};

export type DayType = {
  id: string;
  date: Date;
  start?: Date;
  end?: Date;
  items: ItemType[];
};
