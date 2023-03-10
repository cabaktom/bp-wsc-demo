import { z } from 'zod';

// IN
const AbstractItemIn = z.object({
  id: z.string().min(1),
  index: z.number().optional(),
  participantId: z.string().optional(),
  abstractId: z.string().optional(),
});

export const ItemIn = AbstractItemIn.extend({
  type: z.literal('ITEM'),
  duration: z.number(),
  title: z.string().default(''),
});

export const ChairmanIn = AbstractItemIn.extend({
  type: z.literal('CHAIRMAN'),
});

export const DayIn = z.object({
  id: z.string().min(1),
  date: z.string().optional().pipe(z.coerce.date()),
  additionalInfo: z.string().default(''),
  start: z.string().optional().pipe(z.coerce.date()),
  end: z.string().optional().pipe(z.coerce.date()),
  items: z.array(ItemIn.or(ChairmanIn)),
});

export const ProgrammeIn = z.object({
  conferenceStart: z.string().pipe(z.coerce.date()),
  days: z.array(DayIn),
});

// OUT
const AbstractItemOut = z.object({
  id: z.string().min(1),
  participantId: z.string(),
  abstractId: z.string(),
});

export const ItemOut = AbstractItemOut.extend({
  type: z.literal('ITEM'),
  duration: z.number(),
  title: z.string(),
});

export const ChairmanOut = AbstractItemOut.extend({
  type: z.literal('CHAIRMAN'),
});

export const DayOut = z.object({
  id: z.string().min(1),
  date: z.date(),
  additionalInfo: z.string(),
  start: z.date().optional(),
  end: z.date().optional(),
  items: z.array(ItemOut.or(ChairmanOut)),
});

export const ProgrammeOut = z.object({
  id: z.string().min(1),
  conferenceStart: z.date(),
  days: z.array(DayOut),
});
