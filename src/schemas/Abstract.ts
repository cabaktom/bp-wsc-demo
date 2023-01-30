import { z } from 'zod';

export const Abstract = z.object({
  title: z.string().min(1),
  poster: z.boolean().optional(),
  additionalAuthors: z.string().optional(),
  affiliationAuthors: z.string().optional(),
  abstract: z.string().optional(),
});
