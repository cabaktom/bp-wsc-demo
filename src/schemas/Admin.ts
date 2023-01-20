import { z } from 'zod';

export const AdminIn = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

export const AdminEdit = z.object({
  username: z.string().min(1),
  email: z.string().email(),
});

export const AdminOut = z.object({
  id: z.number().min(1),
  username: z.string().min(1),
  email: z.string().email(),
});
