import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const pages = await prisma.page.findMany();
    res.status(200).json(pages);
  } else {
    res.status(405).setHeader('Allow', 'GET').end();
  }
}
