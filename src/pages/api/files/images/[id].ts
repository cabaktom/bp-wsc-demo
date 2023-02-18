import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

import { prisma } from '../../../../lib/prisma';
import { ImageOut, ImageEdit } from '../../../../schemas/Image';
import handleErrors from '../../../../lib/handleApiErrors';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const idParsed = z.number().int().parse(Number(id));
    const image = await prisma.image.findUnique({ where: { id: idParsed } });

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    return res.status(200).json(ImageOut.parse(image));
  } catch (e) {
    return handleErrors('Image', e, res);
  }
};

const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { alt, filename } = ImageEdit.parse(req.body);
    const idParsed = z.number().int().parse(Number(id));

    const image = await prisma.image.findUnique({ where: { id: idParsed } });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    try {
      await fs.rename(
        path.join(process.cwd(), 'public', image.path),
        path.join(process.cwd(), 'public', 'images', filename),
      );
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        // image not found on the disk, delete from db
        await prisma.image.delete({ where: { id: idParsed } });
        throw e;
      }
    }

    const imageNew = await prisma.image.update({
      where: { id: idParsed },
      data: {
        alt,
        filename,
        path: `/images/${filename}`,
      },
    });

    return res.status(200).json(ImageOut.parse(imageNew));
  } catch (e) {
    return handleErrors('Image', e, res);
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const idParsed = z.number().int().parse(Number(id));

    const imageToDelete = await prisma.image.delete({
      where: { id: idParsed },
    });
    await fs.rm(path.join(process.cwd(), 'public', imageToDelete.path));

    return res.status(204).end();
  } catch (e) {
    return handleErrors('Image', e, res);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // authenticate user
  const token = await getToken({ req });
  if (!token || !token.sub) return res.status(401).end();

  switch (req.method) {
    // GET /api/files/images/{id}
    case 'GET':
      return handleGet(req, res);
    // PATCH /api/files/images/{id}
    case 'PATCH':
      return handlePatch(req, res);
    // DELETE /api/files/images/{id}
    case 'DELETE':
      return handleDelete(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,PATCH,DELETE').end();
  }
}
