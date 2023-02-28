import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import handleErrors from '../../../lib/handleApiErrors';
import { AbstractIn, AbstractOut } from '../../../schemas/Abstract';

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

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);
    const data = AbstractIn.parse(req.body);

    const abstract = await prisma.abstract.update({
      where: { id: idParsed },
      data,
    });

    return res.status(200).json(AbstractOut.parse(abstract));
  } catch (e) {
    return handleErrors('Abstract', e, res);
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);

    await prisma.abstract.delete({ where: { id: idParsed } });

    return res.status(204).end();
  } catch (e) {
    return handleErrors('Abstract', e, res);
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
    // GET /api/admins/{id}
    case 'GET':
      return handleGet(req, res);
    // PUT /api/admins/{id}
    case 'PUT':
      return handlePut(req, res);
    // DELETE /api/admins/{id}
    case 'DELETE':
      return handleDelete(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,PUT,DELETE').end();
  }
}
