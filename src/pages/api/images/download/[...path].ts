import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

import handleErrors from '../../../../lib/handleApiErrors';
import { prisma } from '../../../../lib/prisma';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const queryPath = req.query.path as string[];
    const filename = z.string().parse(queryPath[0]);

    // content type
    const type = filename.split('.').pop();

    // can only download images from the public folder
    const filePath = path.join(process.cwd(), 'public/images/', filename);

    try {
      const { size } = fs.statSync(filePath);

      res.writeHead(200, {
        'Content-Type': `image/${type}`,
        'Content-Length': size,
      });

      const readStream = fs.createReadStream(filePath);

      await new Promise((resolve) => {
        readStream.pipe(res);

        readStream.on('end', resolve);
      });
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        // image not found on the disk, delete from db
        await prisma.image.delete({
          where: { filename },
        });
        throw e;
      }
    }

    return res.status(200).end();
  } catch (e) {
    return handleErrors('Image', e, res);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    // GET /api/images/download/{...path}
    case 'GET':
      return handleGet(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET').end();
  }
}
