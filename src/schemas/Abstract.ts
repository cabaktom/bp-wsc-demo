import { z } from 'zod';

export const AbstractIn = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title must be at most 255 characters long.' }),
  poster: z.boolean().optional(),
  additionalAuthors: z.string().trim().optional(),
  affiliationAuthors: z.string().trim().optional(),
  abstract: z.string().trim().optional(),
});

export const AbstractOut = z.object({
  id: z.string().uuid().min(1),
  title: z.string().min(1),
  poster: z.boolean(),
  additionalAuthors: z.string(),
  affiliationAuthors: z.string(),
  abstract: z.string(),
  participantId: z.string().uuid().min(1),
});
