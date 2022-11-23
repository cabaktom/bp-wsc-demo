import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { prisma } from '../../../lib/prisma';
import sanitize from '../../../lib/sanitize';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const pageId = Number(req.query.pageId);

  if (req.method === 'GET') {
    const page = await prisma.page.findFirst({ where: { id: pageId } });
    if (!page) {
      return res.status(404).end();
    }

    return res.status(200).json(page);
  }
  if (req.method === 'PUT') {
    if (
      !Object.hasOwn(req.body, 'name') ||
      !Object.hasOwn(req.body, 'title') ||
      !Object.hasOwn(req.body, 'content')
    ) {
      return res.status(400).end();
    }

    const pageData = {
      name: req.body.name,
      title: req.body.title,
      content: sanitize(req.body.content),
    };

    try {
      await prisma.page.update({
        where: { id: pageId },
        data: { ...pageData },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        return res.status(404).end();
      }
    }

    return res.status(204).end();
  }
  return res.status(405).setHeader('Allow', 'GET,PUT').end();
}
