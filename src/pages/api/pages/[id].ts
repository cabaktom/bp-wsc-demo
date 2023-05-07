import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import sanitize from '../../../lib/sanitize';
import { PageOut, PageIn } from '../../../schemas/Page';
import handleErrors from '../../../lib/handleApiErrors';
import { revalidatePage } from '../../../lib/revalidate';

/**
 * Handle GET requests to get a page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the page, or an error message.
 */
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);

    const page = await prisma.page.findFirst({ where: { id: idParsed } });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    return res.status(200).json(PageOut.parse(page));
  } catch (e) {
    return handleErrors('Page', e, res);
  }
};

/**
 * Handle PUT requests to update a page. Revalidates the updated page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the updated page, or an error message.
 */
const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);
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

    await revalidatePage(res, page.name);

    return res.status(200).json(PageOut.parse(page));
  } catch (e) {
    return handleErrors('Page', e, res);
  }
};

/**
 * Handle DELETE requests to delete a page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with no content, or an error message.
 */
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);

    await prisma.page.delete({ where: { id: idParsed } });

    return res.status(204).end();
  } catch (e) {
    return handleErrors('Page', e, res);
  }
};

/**
 * Handle requests to /api/pages/[id]. Allowed methods: GET, PUT, DELETE.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @remarks
 * Every route is protected by authentication.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // authenticate user
  const token = await getToken({ req });
  if (!token || !token.sub) return res.status(401).end();

  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,PUT,DELETE').end();
  }
}
