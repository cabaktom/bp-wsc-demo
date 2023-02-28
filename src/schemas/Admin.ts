import { z } from 'zod';

export const AdminIn = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: 'Username is required.' })
    .max(255, { message: 'Username must be at most 255 characters long.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email address is required.' })
    .max(255, { message: 'Email address must be at most 255 characters long.' })
    .email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' }),
});

export const AdminEdit = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: 'Username is required.' })
    .max(255, { message: 'Username must be at most 255 characters long.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email address is required.' })
    .max(255, { message: 'Email address must be at most 255 characters long.' })
    .email({ message: 'Invalid email address.' }),
});

export const AdminOut = z.object({
  id: z.string().uuid().min(1),
  username: z.string().min(1),
  email: z.string().email(),
});
