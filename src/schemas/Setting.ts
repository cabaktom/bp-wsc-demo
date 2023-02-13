import { z } from 'zod';

export const SettingIn = z.object({
  option: z
    .string()
    .trim()
    .min(1, { message: 'Option must be at least 1 character long' }),
  value: z.string().trim().optional(),
});

export const SettingOut = z.object({
  id: z.number().min(1),
  option: z.string().min(1),
  value: z.string(),
});
