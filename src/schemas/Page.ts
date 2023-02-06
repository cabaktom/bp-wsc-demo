import { z } from 'zod';

export const PageIn = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
});

export const PageOut = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
});
