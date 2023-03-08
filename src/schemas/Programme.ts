import { z } from 'zod';

export const ProgrammeIn = z.object({
  conferenceStart: z.string().pipe(z.coerce.date()),
  days: z.array(
    z.object({
      id: z.string().min(1),
      date: z.string().pipe(z.coerce.date()),
      start: z.string().pipe(z.coerce.date()).optional(),
      end: z.string().pipe(z.coerce.date()).optional(),
      items: z.array(
        z.object({
          id: z.string().min(1),
          duration: z.number(),
          title: z.string().default(''),
          participantId: z.string().default(''),
          abstractId: z.string().default(''),
        }),
      ),
    }),
  ),
});

export const ProgrammeOut = z.object({
  id: z.string().min(1),
  conferenceStart: z.date(),
  days: z.array(
    z.object({
      id: z.string().min(1),
      date: z.date(),
      start: z.date().optional(),
      end: z.date().optional(),
      items: z.array(
        z.object({
          id: z.string().min(1),
          duration: z.number(),
          title: z.string(),
          participantId: z.string(),
          abstractId: z.string(),
        }),
      ),
    }),
  ),
});
