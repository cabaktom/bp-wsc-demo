import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

import { prisma } from '../../../lib/prisma';
import { ImageOut, ImageEdit } from '../../../schemas/Image';
import handleErrors from '../../../lib/handleApiErrors';
import { revalidatePage } from '../../../lib/revalidate';

/**
 * Handle GET requests to get image metadata.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the image metadata, or an error message.
 */
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);
    const image = await prisma.image.findUnique({ where: { id: idParsed } });

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    return res.status(200).json(ImageOut.parse(image));
  } catch (e) {
    return handleErrors('Image', e, res);
  }
};

/**
 * Handle PATCH requests to update image metadata. Revalidates the gallery page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the updated image metadata, or an error message.
 */
const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { alt, filename } = ImageEdit.parse(req.body);
    const idParsed = z.string().uuid().parse(req.query.id);

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

    await revalidatePage(res, 'gallery');

    return res.status(200).json(ImageOut.parse(imageNew));
  } catch (e) {
    return handleErrors('Image', e, res);
  }
};

/**
 * Handle DELETE requests to delete an image. Revalidates the gallery page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with no content, or an error message.
 */
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);

    const imageToDelete = await prisma.image.delete({
      where: { id: idParsed },
    });
    await fs.rm(path.join(process.cwd(), 'public', imageToDelete.path));

    await revalidatePage(res, 'gallery');

    return res.status(204).end();
  } catch (e) {
    return handleErrors('Image', e, res);
  }
};

/**
 * Handle requests to /api/images/[id]. Allowed methods: GET, PATCH, DELETE.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @remarks
 * Every route is protected by authentication.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // authenticate user
  const token = await getToken({ req });
  if (!token || !token.sub) return res.status(401).end();

  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'PATCH':
      return handlePatch(req, res);
    case 'DELETE':
      return handleDelete(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,PATCH,DELETE').end();
  }
}
