import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { errors as formidableErrors } from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import { getToken } from 'next-auth/jwt';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await fs.readdir(path.join(process.cwd(), 'public', 'images'));
  } catch (err) {
    await fs.mkdir(path.join(process.cwd(), 'public', 'images'));
  }

  const options: formidable.Options = {
    multiples: true,
    uploadDir: path.join(process.cwd(), 'public', 'images'),
    filename: (name, ext, part) =>
      `${Date.now().toString()}_${part.originalFilename}`,
    filter: (part) => !!part.mimetype && part.mimetype.includes('image'),
    maxFileSize: 30 * 1024 * 1024, // 30MB
  };

  const form = formidable(options);

  form.parse(req, (err, fields, files) => {
    if (err) {
      if (err.code === formidableErrors.biggerThanMaxFileSize) {
        return res.status(400).json({
          message: 'Max file size (30MB) exceeded.',
        });
      }
      return res.status(500).json({ message: 'Something went wrong.' });
    }
    return res
      .status(200)
      .json({ message: 'Image(s) uploaded.', files, fields });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // authenticate user
  const token = await getToken({ req });
  if (!token || !token.sub) return res.status(401).end();

  switch (req.method) {
    // POST /api/files/images
    case 'POST':
      return handlePost(req, res);

    default:
      return res.status(405).setHeader('Allow', 'POST').end();
  }
}
