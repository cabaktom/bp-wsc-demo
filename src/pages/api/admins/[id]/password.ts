import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../../lib/prisma';
import handleErrors from '../../../../lib/handleApiErrors';
import { comparePwd, hashPwd } from '../../../../lib/password';

/**
 * Handle PATCH requests to change an admin's password.
 *
 * @param req The request object.
 * @param res The response object.
 * @param sessionUserId The id of the authenticated user.
 *
 * @returns A response with the updated admin, or an error message.
 *
 * @remarks
 * Only the authenticated user can change their own password.
 */
const handlePatch = async (
  req: NextApiRequest,
  res: NextApiResponse,
  sessionUserId: string,
) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);
    if (idParsed !== sessionUserId) {
      return res.status(403).json({
        message: 'You can only change your own password',
      });
    }

    const currentPasswordPlaintext = z
      .string()
      .min(1)
      .parse(req.body.currentPassword);
    const newPasswordPlaintext = z.string().min(1).parse(req.body.newPassword);

    const data = await prisma.admin.findUnique({
      where: { id: idParsed },
      select: { password: true },
    });

    if (!data) {
      return res.status(404).json({ message: 'Administrator not found' });
    }

    if (!(await comparePwd(currentPasswordPlaintext, data.password))) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const newPasswordHash = await hashPwd(newPasswordPlaintext);
    await prisma.admin.update({
      where: { id: idParsed },
      data: { password: newPasswordHash },
    });

    return res.status(200).json({ message: 'Password changed' });
  } catch (e) {
    return handleErrors('Administrator', e, res);
  }
};

/**
 * Handle requests to /api/admins/[id]/password. Allowed methods: PATCH.
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
    case 'PATCH':
      return handlePatch(req, res, token.sub);

    default:
      return res.status(405).setHeader('Allow', 'PATCH').end();
  }
}
