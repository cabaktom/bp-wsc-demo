import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { prisma } from '../../../lib/prisma';
import { PageIn, PageOut } from '../../../schemas/Page';
import handleErrors from '../../../lib/handleApiErrors';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pages = await prisma.page.findMany();
    const pagesOut = pages.map((page) => PageOut.parse(page));
    return res.status(200).json(pagesOut);
  } catch (e) {
    return handleErrors('Page', e, res);
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = PageIn.parse(req.body);

    const page = await prisma.page.create({
      data,
    });

    return res.status(201).json(PageOut.parse(page));
  } catch (e) {
    return handleErrors('Page', e, res);
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
    // GET /api/pages
    case 'GET':
      return handleGet(req, res);
    // POST /api/pages
    case 'POST':
      return handlePost(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,POST').end();
  }
}
