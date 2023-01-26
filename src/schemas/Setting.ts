import { z } from 'zod';

export const SettingIn = z.object({
  option: z.string().min(1),
  value: z.string().optional(),
});

export const SettingOut = z.object({
  id: z.number().min(1),
  option: z.string().min(1),
  value: z.string(),
});
