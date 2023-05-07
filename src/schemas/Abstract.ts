import { z } from 'zod';

/**
 * The abstract input schema.
 *
 * @remarks
 * This is used for validating abstract input data in the API when creating or updating an abstract.
 */
export const AbstractIn = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title must be at most 255 characters long.' }),
  additionalAuthors: z.string().trim().optional(),
  affiliationAuthors: z.string().trim().optional(),
  abstract: z.string().trim().optional(),
});

/**
 * The abstract output schema.
 *
 * @remarks
 * This is used for validating abstract output data in the API.
 */
export const AbstractOut = z.object({
  id: z.string().uuid().min(1),
  title: z.string().min(1),
  additionalAuthors: z.string(),
  affiliationAuthors: z.string(),
  abstract: z.string(),
  participantId: z.string().uuid().min(1),
});
