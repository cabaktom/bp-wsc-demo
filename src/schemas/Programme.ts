import { z } from 'zod';

// ==================== INPUT ====================
const AbstractItemIn = z.object({
  id: z.string().min(1),
  index: z.number().optional(),
  participantId: z.string().optional(),
  abstractId: z.string().optional(),
});

/**
 * The item input schema.
 *
 * @remarks
 * This is used for validating day item (i.e. lecture) when parsing items of a day from the programme input data.
 */
export const ItemIn = AbstractItemIn.extend({
  type: z.literal('ITEM'),
  duration: z.number(),
  title: z.string().default(''),
});

/**
 * The chairman input schema.
 *
 * @remarks
 * This is used for validating chairman day item when parsing items of a day from the programme input data.
 */
export const ChairmanIn = AbstractItemIn.extend({
  type: z.literal('CHAIRMAN'),
});

/**
 * The programme day input schema.
 *
 * @remarks
 * This is used for validating day input data when parsing days from the programme input data.
 */
export const DayIn = z.object({
  id: z.string().min(1),
  date: z.string().optional().pipe(z.coerce.date()),
  additionalInfo: z.string().default(''),
  start: z.string().optional().pipe(z.coerce.date()),
  end: z.string().optional().pipe(z.coerce.date()),
  items: z.array(ItemIn.or(ChairmanIn)),
});

/**
 * The programme input schema.
 *
 * @remarks
 * This is used for validating programme input data in the API when creating or updating a programme.
 */
export const ProgrammeIn = z.object({
  conferenceStart: z.string().pipe(z.coerce.date()),
  days: z.array(DayIn),
});

// ==================== OUTPUT ====================
const AbstractItemOut = z.object({
  id: z.string().min(1),
  participantId: z.string(),
  abstractId: z.string(),
});

/**
 * The item output schema.
 *
 * @remarks
 * This is used for validating day item (i.e. lecture) when parsing items of a day from the programme output data.
 */
export const ItemOut = AbstractItemOut.extend({
  type: z.literal('ITEM'),
  duration: z.number(),
  title: z.string(),
});

/**
 * The chairman output schema.
 *
 * @remarks
 * This is used for validating chairman day item when parsing items of a day from the programme output data.
 */
export const ChairmanOut = AbstractItemOut.extend({
  type: z.literal('CHAIRMAN'),
});

/**
 * The programme day output schema.
 *
 * @remarks
 * This is used for validating day output data in the API.
 */
export const DayOut = z.object({
  id: z.string().min(1),
  date: z.date(),
  additionalInfo: z.string(),
  start: z.date().optional(),
  end: z.date().optional(),
  items: z.array(ItemOut.or(ChairmanOut)),
});

/**
 * The programme output schema.
 *
 * @remarks
 * This is used for validating programme output data in the API.
 */
export const ProgrammeOut = z.object({
  id: z.string().min(1),
  conferenceStart: z.date(),
  days: z.array(DayOut),
});
