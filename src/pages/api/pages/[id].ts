import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import sanitize from '../../../lib/sanitize';
import { PageOut, PageIn } from '../../../schemas/Page';
import handleErrors from '../../../lib/handleApiErrors';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const idParsed = z.number().int().parse(Number(id));
    const page = await prisma.page.findFirst({ where: { id: idParsed } });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    return res.status(200).json(PageOut.parse(page));
  } catch (e) {
    return handleErrors('Page', e, res);
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const idParsed = z.number().int().parse(Number(id));
    const { name, title, content } = PageIn.parse(req.body);

    const pageData = {
      name,
      title,
      content: sanitize(content),
    };

    const page = await prisma.page.update({
      where: { id: idParsed },
      data: { ...pageData },
    });

    return res.status(200).json(PageOut.parse(page));
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
    // GET /api/pages/{id}
    case 'GET':
      return handleGet(req, res);
    // PUT /api/pages/{id}
    case 'PUT':
      return handlePut(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,PUT').end();
  }
}
