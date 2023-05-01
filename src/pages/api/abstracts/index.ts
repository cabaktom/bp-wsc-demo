import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import handleErrors from '../../../lib/handleApiErrors';
import { AbstractIn, AbstractOut } from '../../../schemas/Abstract';
// import { revalidatePage } from '../../../lib/revalidate';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const abstracts = await prisma.abstract.findMany({
      orderBy: { id: 'asc' },
    });
    const abstractsOut = abstracts.map((abstract) =>
      AbstractOut.parse(abstract),
    );

    return res.status(200).json(abstractsOut);
  } catch (e) {
    return handleErrors('Abstract', e, res);
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const participantId = z.string().uuid().parse(req.body.participantId);
    const data = AbstractIn.parse(req.body);

    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    });
    if (!participant) {
      return res.status(404).json({
        message: 'Participant not found, could not create related abstract.',
      });
    }

    const abstract = await prisma.abstract.create({
      data: {
        ...data,
        participant: { connect: { id: participantId } },
      },
    });

    // await revalidatePage(res, 'participants');

    return res.status(201).json(AbstractOut.parse(abstract));
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
    // GET /api/abstracts
    case 'GET':
      return handleGet(req, res);
    // POST /api/abstracts
    case 'POST':
      return handlePost(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,POST').end();
  }
}
