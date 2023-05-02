import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import handleErrors from '../../../lib/handleApiErrors';
import { SettingIn, SettingOut } from '../../../schemas/Setting';
import { revalidateSettings } from '../../../lib/revalidate';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const settings = await prisma.siteSettings.findMany({
      orderBy: { id: 'asc' },
    });

    return res
      .status(200)
      .json(settings.map((setting) => SettingOut.parse(setting)));
  } catch (e) {
    return handleErrors('Setting', e, res);
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.body.map((setting: unknown) =>
      SettingIn.parse(setting),
    ) as z.infer<typeof SettingIn>[];

    // create array of prisma transactions for each object
    const transactions = data.map((item) =>
      prisma.siteSettings.update({
        where: { option: item.option },
        data: item,
      }),
    );

    const settings = await prisma.$transaction(transactions);

    await revalidateSettings(res);

    return res
      .status(200)
      .json(settings.map((setting) => SettingOut.parse(setting)));
  } catch (e) {
    return handleErrors('Setting', e, res);
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
    // GET /api/settings
    case 'GET':
      return handleGet(req, res);
    // POST /api/settings
    case 'PUT':
      return handlePut(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,PUT').end();
  }
}
