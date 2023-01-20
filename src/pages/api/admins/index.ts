import type { NextApiRequest, NextApiResponse } from 'next';
// import { getToken } from 'next-auth/jwt';

import { hashPwd } from '../../../lib/password';
import { prisma } from '../../../lib/prisma';
import { AdminIn, AdminOut } from '../../../schemas/Admin';
import handleErrors from '../../../lib/handleApiErrors';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const admins = await prisma.admin.findMany({ orderBy: { id: 'asc' } });
  const adminsOut = admins.map((admin) => AdminOut.parse(admin));

  return res.status(200).json(adminsOut);
};

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
    // GET /api/admins
    case 'GET':
      return handleGet(req, res);
    // POST /api/admins
    case 'POST':
      return handlePost(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,POST').end();
  }
}
