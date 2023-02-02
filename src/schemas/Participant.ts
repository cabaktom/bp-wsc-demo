import { z } from 'zod';

const Participation = z.enum(['ONLINE', 'ONSITE']);

export const ParticipantIn = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  affiliation: z.string().min(1),
  participation: Participation.optional(),
  mailingAddress: z.string().optional(),
  student: z.boolean().optional(),
  additionalMessage: z.string().optional(),
});

export const ParticipantOut = z.object({
  id: z.number().min(1),
  fullName: z.string().min(1),
  email: z.string().email(),
  affiliation: z.string().min(1),
  participation: Participation.nullable(),
  mailingAddress: z.string().nullable(),
  student: z.boolean().nullable(),
  additionalMessage: z.string().nullable(),
});
