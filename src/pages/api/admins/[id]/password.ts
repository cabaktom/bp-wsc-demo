import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../../lib/prisma';
import handleErrors from '../../../../lib/handleApiErrors';
import { comparePwd, hashPwd } from '../../../../lib/password';

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  // TODO: admin can only change their own password

  try {
    const idParsed = z.number().int().parse(Number(id));
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // authenticate user
  const token = await getToken({ req });
  if (!token || !token.sub) return res.status(401).end();

  switch (req.method) {
    // PUT /api/admins/{id}/password
    case 'PUT':
      return handlePut(req, res);

    default:
      return res.status(405).setHeader('Allow', 'PUT').end();
  }
}
