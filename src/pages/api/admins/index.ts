import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

import { hashPwd } from '../../../lib/password';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // authenticate user
  // FIXME: does not work with external requests (works inside app)
  const token = await getToken({ req });
  if (token) {
    console.log('JSON Web Token', JSON.stringify(token, null, 2));
  } else {
    return res.status(401).end();
  }

  // GET /api/admins
  if (req.method === 'GET') {
    const admins = await prisma.admin.findMany({
      select: { username: true, email: true },
    });

    return res.status(200).json({ admins });
  }

  // POST /api/admins
  if (req.method === 'POST') {
    if (
      !Object.hasOwn(req.body, 'username') ||
      !Object.hasOwn(req.body, 'password') ||
      !Object.hasOwn(req.body, 'email')
    ) {
      return res.status(400).end();
    }

    const { username, password, email } = req.body;

    const hash = await hashPwd(password);

    try {
      const admin = await prisma.admin.create({
        data: {
          username,
          password: hash,
          email,
        },
      });

      return res.status(201).json({
        username: admin.username,
        email: admin.email,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          const field = (e.meta?.target as string[])[0];
          return res.status(400).json({
            message: `Administrator with this ${field} already exists.`,
          });
        }

        console.log(e);
        return res.status(400).json({ message: 'Something went wrong.' });
      }
    }
  }

  return res.status(405).setHeader('Allow', 'GET,POST').end();
}
