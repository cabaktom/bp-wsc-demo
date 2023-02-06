import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';
import { PageOut } from '../../../schemas/Page';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const pages = await prisma.page.findMany();
    const pagesOut = pages.map((page) => PageOut.parse(page));
    res.status(200).json(pagesOut);
  } else {
    res.status(405).setHeader('Allow', 'GET').end();
  }
}
