import type { Participation as ParticipationType } from '@prisma/client';
import { z } from 'zod';

import { ChairmanIn, DayIn, ItemIn } from '../schemas/ProgrammeSchema';

export type DayType = z.infer<typeof DayIn>;
export type ItemType = z.Tyinfer<typeof ItemIn>;
export type ChairmanItemType = z.infer<typeof ChairmanIn>;

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
