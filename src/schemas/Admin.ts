import { z } from 'zod';

/**
 * The admin input schema.
 *
 * @remarks
 * This is used for validating admin input data in the API when creating an admin.
 */
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

/**
 * The admin edit schema.
 *
 * @remarks
 * This is used for validating admin edit data in the API when updating an admin.
 */
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

/**
 * The admin output schema.
 *
 * @remarks
 * This is used for validating admin output data in the API.
 */
export const AdminOut = z.object({
  id: z.string().uuid().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  createdByAdminId: z.string().uuid().nullable(),
});
