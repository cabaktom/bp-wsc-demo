import type { NextApiRequest, NextApiResponse } from 'next';
// import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import { AdminOut, AdminEdit } from '../../../schemas/Admin';
import handleErrors from '../../../lib/handleApiErrors';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const idParsed = z.number().int().parse(Number(id));
    const admin = await prisma.admin.findUnique({ where: { id: idParsed } });

    if (!admin) {
      return res.status(404).json({ message: 'Administrator not found' });
    }

    return res.status(200).json(AdminOut.parse(admin));
  } catch (e) {
    return handleErrors('Administrator', e, res);
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { username, email } = AdminEdit.parse(req.body);
    const idParsed = z.number().int().parse(Number(id));
    const admin = await prisma.admin.update({
      where: { id: idParsed },
      data: {
        username,
        email,
      },
    });

    return res.status(200).json(AdminOut.parse(admin));
  } catch (e) {
    return handleErrors('Administrator', e, res);
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const idParsed = z.number().int().parse(Number(id));
    await prisma.admin.delete({ where: { id: idParsed } });

    return res.status(204).end();
  } catch (e) {
    return handleErrors('Administrator', e, res);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // authenticate user
  // FIXME: does not work with external requests (works inside app)
  // const token = await getToken({ req });
  // if (!token) {
  // console.log('JSON Web Token', JSON.stringify(token, null, 2));
  // } else {
  // return res.status(401).end();
  // }

  switch (req.method) {
    // GET /api/admins/{id}
    case 'GET':
      await handleGet(req, res);
      break;
    // PUT /api/admins/{id}
    case 'PUT':
      await handlePut(req, res);
      break;
    // DELETE /api/admins/{id}
    case 'DELETE':
      await handleDelete(req, res);
      break;
  }
  return res.status(405).setHeader('Allow', 'GET,PUT,DELETE').end();
}
