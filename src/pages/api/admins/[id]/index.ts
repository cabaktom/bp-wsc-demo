import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../../lib/prisma';
import { AdminOut, AdminEdit } from '../../../../schemas/Admin';
import handleErrors from '../../../../lib/handleApiErrors';

/**
 * Handle GET requests to get an admin.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the admin, or an error message.
 */
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);
    const admin = await prisma.admin.findUnique({ where: { id: idParsed } });

    if (!admin) {
      return res.status(404).json({ message: 'Administrator not found' });
    }

    return res.status(200).json(AdminOut.parse(admin));
  } catch (e) {
    return handleErrors('Administrator', e, res);
  }
};

/**
 * Handle PATCH requests to update an admin. Password is not updated here (see /api/admins/[id]/password).
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the updated admin, or an error message.
 */
const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, email } = AdminEdit.parse(req.body);
    const idParsed = z.string().uuid().parse(req.query.id);
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

/**
 * Handle DELETE requests to delete an admin.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the updated admin, or an error message.
 *
 * @remarks
 * Authenticated user cannot delete their own account.
 */
const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse,
  sessionUserId: string,
) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);
    if (idParsed === sessionUserId) {
      return res.status(400).json({
        message: 'You cannot delete your own account',
      });
    }

    await prisma.admin.delete({ where: { id: idParsed } });

    return res.status(204).end();
  } catch (e) {
    return handleErrors('Administrator', e, res);
  }
};

/**
 * Handle requests to /api/admins/[id]. Allowed methods: GET, PATCH, DELETE.
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
    case 'PATCH':
      return handlePatch(req, res);
    case 'DELETE':
      return handleDelete(req, res, token.sub);

    default:
      return res.status(405).setHeader('Allow', 'GET,PATCH,DELETE').end();
  }
}
