import { z } from 'zod';

const Participation = z.enum(['ONLINE', 'ONSITE']);

export const ParticipantIn = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: 'Full name is required.' })
    .max(255, { message: 'Full name must be at most 255 characters long.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email address is required.' })
    .max(255, { message: 'Email address must be at most 255 characters long.' })
    .email({ message: 'Invalid email address.' }),
  affiliation: z
    .string()
    .trim()
    .min(1, { message: 'Affiliation is required.' }),
  participation: Participation.optional(),
  mailingAddress: z.string().trim().optional(),
  student: z.boolean().optional(),
  additionalMessage: z.string().trim().optional(),
  poster: z.boolean().optional(),
  invited: z.boolean().optional(),
});

export const ParticipantOut = z.object({
  id: z.string().uuid().min(1),
  fullName: z.string().min(1),
  email: z.string().email(),
  affiliation: z.string().min(1),
  participation: Participation,
  mailingAddress: z.string(),
  student: z.boolean(),
  additionalMessage: z.string(),
  poster: z.boolean(),
  invited: z.boolean(),
});
