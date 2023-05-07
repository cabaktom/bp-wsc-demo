import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import handleErrors from '../../../lib/handleApiErrors';
import { AbstractIn, AbstractOut } from '../../../schemas/Abstract';
import { revalidatePage } from '../../../lib/revalidate';

/**
 * Handle GET requests to get an abstract.
 *
 * @param req The request object.
 * @param res The response object.
 * @returns A response with the abstract, or an error message.
 */
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const idParsed = z.string().uuid().parse(id);

    const abstract = await prisma.abstract.findUnique({
      where: { id: idParsed },
    });
    if (!abstract) {
      return res.status(404).json({ message: 'Abstract not found' });
    }

    return res.status(200).json(AbstractOut.parse(abstract));
  } catch (e) {
    return handleErrors('Abstract', e, res);
  }
};

/**
 * Handle PUT requests to update an abstract. Revalidates the participants page.
 *
 * @param req The request object.
 * @param res The response object.
 * @returns A response with the updated abstract, or an error message.
 */
const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);
    const data = AbstractIn.parse(req.body);

    const abstract = await prisma.abstract.update({
      where: { id: idParsed },
      data,
    });

    await revalidatePage(res, 'participants');

    return res.status(200).json(AbstractOut.parse(abstract));
  } catch (e) {
    return handleErrors('Abstract', e, res);
  }
};

/**
 * Handle DELETE requests to delete an abstract. Revlidates the participants page.
 *
 * @param req The request object.
 * @param res The response object.
 * @returns A response with no content, or an error message.
 */
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);

    await prisma.abstract.delete({ where: { id: idParsed } });

    await revalidatePage(res, 'participants');

    return res.status(204).end();
  } catch (e) {
    return handleErrors('Abstract', e, res);
  }
};

/**
 * Handle requests to /api/abstracts/{id}. Allowed methods: GET, PUT, DELETE.
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
