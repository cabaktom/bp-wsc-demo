import { z } from 'zod';

export const PageIn = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required.' })
    .max(255, { message: 'Name must be at most 255 characters long.' }),
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required.' })
    .max(255, { message: 'Title must be at most 255 characters long.' }),
  content: z.string().trim().min(1, { message: 'Content is required.' }),
  order: z
    .number()
    .int()
    .min(1, {
      message: 'Order is required, must be at least 1 and must be unique.',
    }),
});

export const PageOut = z.object({
  id: z.string().uuid().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  order: z.number().int().min(0),
});
