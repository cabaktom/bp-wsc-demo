import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { errors as formidableErrors } from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import imageSize from 'image-size';
import { getToken } from 'next-auth/jwt';

import { prisma } from '../../../lib/prisma';
import { ImageOut } from '../../../schemas/Image';
import { revalidatePage } from '../../../lib/revalidate';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const images = await prisma.image.findMany();
  const imagesOut = images.map((image) => ImageOut.parse(image));

  return res.status(200).json(imagesOut);
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
    maxFileSize: 30 * 1024 * 1024, // 30MB
  });

  const responseMessages: {
    status: 'success' | 'error';
    file: {
      path: string;
      newFilename: string;
      originalFilename: string;
      width: number;
      height: number;
    };
  }[] = [];

  // check if file is an image
  form.on('file', (formName, file) => {
    const status =
      !!file.mimetype && !file.mimetype.includes('image') ? 'error' : 'success';

    const { width, height } =
      status === 'success'
        ? imageSize(file.filepath)
        : { width: -1, height: -1 };

    responseMessages.push({
      status,
      file: {
        path: `/images/${file.newFilename}`,
        newFilename: file.newFilename,
        originalFilename: file.originalFilename ?? '',
        width: width ?? 0,
        height: height ?? 0,
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
    const promises = responseMessages.map(
      ({ file: { path, newFilename, originalFilename, width, height } }) => {
        return prisma.image.create({
          data: {
            path,
            filename: newFilename,
            originalFilename: originalFilename ?? '',
            width,
            height,
          },
        });
      },
    );
    const results = await Promise.all(promises);

    await revalidatePage(res, '/gallery');

    return res.status(200).json({
      status: 'success',
      message: 'Image(s) uploaded successfully.',
      images: results,
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
    // GET /api/images
    case 'GET':
      return handleGet(req, res);
    // POST /api/images
    case 'POST':
      return handlePost(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,POST').end();
  }
}
