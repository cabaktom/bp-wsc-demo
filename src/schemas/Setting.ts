import { z } from 'zod';

/**
 * The setting input schema.
 *
 * @remarks
 * This is used for validating setting input data in the API when creating or updating a setting.
 */
export const SettingIn = z.object({
  option: z
    .string()
    .trim()
    .min(1, { message: 'Option must be at least 1 character long' }),
  value: z.string().trim().optional(),
});

/**
 * The setting output schema.
 *
 * @remarks
 * This is used for validating setting output data in the API.
 */
export const SettingOut = z.object({
  id: z.string().uuid().min(1),
  option: z.string().min(1),
  value: z.string(),
  order: z.number().int(),
  adminId: z.string().uuid().min(1),
});
