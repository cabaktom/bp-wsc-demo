import { z } from 'zod';

const Participation = z.enum(['ONLINE', 'ONSITE']);

export const Participant = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  affiliation: z.string().min(1),
  participation: Participation.optional(),
  mailingAddress: z.string().optional(),
  student: z.boolean().optional(),
  additionalMessage: z.string().optional(),
});
