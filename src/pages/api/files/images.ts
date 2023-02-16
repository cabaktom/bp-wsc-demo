import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { errors as formidableErrors } from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import { getToken } from 'next-auth/jwt';

import { prisma } from '../../../lib/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  // create images folder if it doesn't exist
  try {
    await fs.readdir(path.join(process.cwd(), 'public', 'images'));
  } catch (err) {
    await fs.mkdir(path.join(process.cwd(), 'public', 'images'));
  }

  const form = formidable({
    multiples: true,
    uploadDir: path.join(process.cwd(), 'public', 'images'),
    filename: (name, ext, part) =>
      `${Date.now().toString()}_${part.originalFilename}`,
    maxFileSize: 2 * 1024 * 1024, // 30MB
  });

  const responseMessages: {
    status: 'success' | 'error';
    file: {
      path: string;
      newFilename: string;
      originalFilename: string;
    };
  }[] = [];

  // check if file is an image
  form.on('file', (formName, file) => {
    responseMessages.push({
      status:
        !!file.mimetype && !file.mimetype.includes('image')
          ? 'error'
          : 'success',
      file: {
        path: `/images/${file.newFilename}`,
        newFilename: file.newFilename,
        originalFilename: file.originalFilename ?? '',
      },
    });
  });

  form.on('end', async () => {
    // if any file is not an image, delete all files from the request
    const allFilesAreImages = responseMessages.every(
      (message) => message.status === 'success',
    );

    if (!allFilesAreImages) {
      const promises = responseMessages.map((message) =>
        fs.rm(
          path.join(
            process.cwd(),
            'public',
            'images',
            message.file.newFilename,
          ),
        ),
      );
      await Promise.all(promises);

      return res.status(400).json({
        status: 'error',
        message: 'One of the provided files is not an image.',
      });
    }

    // if all files are images, create database records
    const promises = responseMessages.map((message) => {
      return prisma.image.create({
        data: {
          path: message.file.path,
          filename: message.file.newFilename,
          originalFilename: message.file.originalFilename ?? '',
        },
      });
    });
    Promise.all(promises);

    return res.status(200).json({
      status: 'success',
      message: 'Image(s) uploaded successfully.',
      images: responseMessages.map((message) => message.file),
    });
  });

  form.on('error', (err) => {
    if (err.code === formidableErrors.biggerThanMaxFileSize) {
      return res.status(400).json({
        status: 'error',
        message: 'File is too big. Maximum size of one file is 30MB.',
      });
    }

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  });

  await new Promise(() => {
    form.parse(req);
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
