import { z } from 'zod';

export const ImageEdit = z.object({
  alt: z
    .string()
    .trim()
    .max(255, { message: 'Title must be at most 255 characters long.' }),
  filename: z
    .string()
    .trim()
    .min(1, { message: 'Filename is required.' })
    .max(255, { message: 'Filename must be at most 255 characters long.' }),
});

export const ImageOut = z.object({
  id: z.number().min(1),
  alt: z.string(),
  path: z.string().min(1),
  filename: z.string().min(1),
  originalFilename: z.string().min(1),
  uploadedAt: z.date(),
});
