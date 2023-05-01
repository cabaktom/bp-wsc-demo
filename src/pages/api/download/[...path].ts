import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

import handleErrors from '../../../lib/handleApiErrors';
import { prisma } from '../../../lib/prisma';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pathSlug = (req.query.path as string[]).join('/');
    const pathParsed = z.string().parse(pathSlug);

    // content type
    const type = pathParsed.split('.').pop();

    // can only download files from the public folder
    const filePath = path.join(process.cwd(), 'public', pathParsed);

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
          where: {
            filename: pathParsed.substring(pathParsed.indexOf('/') + 1),
          },
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
    // GET /api/download/{...path}
    case 'GET':
      return handleGet(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET').end();
  }
}
