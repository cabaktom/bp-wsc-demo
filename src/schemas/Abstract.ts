import { z } from 'zod';

export const AbstractIn = z.object({
  title: z.string().min(1),
  poster: z.boolean().optional(),
  additionalAuthors: z.string().optional(),
  affiliationAuthors: z.string().optional(),
  abstract: z.string().optional(),
});

export const AbstractOut = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  poster: z.boolean().nullable(),
  additionalAuthors: z.string().nullable(),
  affiliationAuthors: z.string().nullable(),
  abstract: z.string().nullable(),
  participantId: z.number().min(1),
});
