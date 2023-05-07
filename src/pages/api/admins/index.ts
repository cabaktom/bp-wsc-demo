import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { hashPwd } from '../../../lib/password';
import { prisma } from '../../../lib/prisma';
import { AdminIn, AdminOut } from '../../../schemas/Admin';
import handleErrors from '../../../lib/handleApiErrors';

/**
 * Handle GET requests to get all admins.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the admins, or an error message.
 */
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const admins = await prisma.admin.findMany({ orderBy: { id: 'asc' } });
  const adminsOut = admins.map((admin) => AdminOut.parse(admin));

  return res.status(200).json(adminsOut);
};

/**
 * Handle POST requests to create an admin.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the created admin, or an error message.
 */
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, email, password } = AdminIn.parse(req.body);
    const hash = await hashPwd(password);

    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hash,
      },
    });

    return res.status(201).json(AdminOut.parse(admin));
  } catch (e) {
    return handleErrors('Administrator', e, res);
  }
};

/**
 * Handle requests to /api/admins. Allowed methods: GET, POST.
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
    case 'POST':
      return handlePost(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,POST').end();
  }
}
