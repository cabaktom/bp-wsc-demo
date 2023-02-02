import { Prisma } from '@prisma/client';
import type { NextApiResponse } from 'next';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

const handleApiErrors = (title: string, e: any, res: NextApiResponse) => {
  if (e instanceof ZodError) {
    const validationError = fromZodError(e);
    return res.status(400).json({ message: validationError.message });
  }
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2025') {
      return res.status(404).json({ message: `${title} not found.` });
    }
    if (e.code === 'P2002') {
      const field = (e.meta?.target as string[])[0];
      return res.status(400).json({
        message: `${title} with this ${field} already exists.`,
      });
    }
    if (e.code === 'P2014') {
      return res.status(400).json({
        message: `${e.meta?.model_b_name} already has ${e.meta?.model_a_name}.`,
      });
    }
  }

  return res.status(400).json({ message: 'Something went wrong.' });
};

export default handleApiErrors;
