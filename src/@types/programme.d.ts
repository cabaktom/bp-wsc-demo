import type { Participation as ParticipationType } from '@prisma/client';
import { z } from 'zod';

import { ChairmanIn, DayIn, ItemIn } from '../schemas/Programme';

export type DayType = z.infer<typeof DayIn>;
export type ItemType = z.infer<typeof ItemIn>;
export type ChairmanItemType = z.infer<typeof ChairmanIn>;

export type ProgrammeType = {
  id: string;
  conferenceStart: Date;
  days: DayType[];
};

export type ParticipantType = {
  id: string;
  value: string;
  label: string;
  fullName: string;
  abstractTitle?: string;
  group: string;
  invited: boolean;
  participation: ParticipationType;
  message: string | null;
};
