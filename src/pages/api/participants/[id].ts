import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import handleErrors from '../../../lib/handleApiErrors';
import { ParticipantIn, ParticipantOut } from '../../../schemas/Participant';
import { AbstractOut } from '../../../schemas/Abstract';
// import { revalidatePage } from '../../../lib/revalidate';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { abstract } = req.query;

  try {
    const idParsed = z.string().uuid().parse(req.query.id);

    const participant = await prisma.participant.findUnique({
      where: { id: idParsed },
      include: { abstract: abstract !== 'false' },
    });
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    return res.status(200).json({
      ...ParticipantOut.parse(participant),
      abstract: participant.abstract
        ? AbstractOut.parse(participant.abstract)
        : undefined,
    });
  } catch (e) {
    return handleErrors('Participant', e, res);
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);
    const data = ParticipantIn.parse(req.body);

    const participant = await prisma.participant.update({
      where: { id: idParsed },
      data,
    });

    // await revalidatePage(res, 'participants');

    return res.status(200).json(ParticipantOut.parse(participant));
  } catch (e) {
    return handleErrors('Participant', e, res);
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);

    await prisma.participant.delete({ where: { id: idParsed } });

    // await revalidatePage(res, 'participants');

    return res.status(204).end();
  } catch (e) {
    return handleErrors('Participant', e, res);
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
    // GET /api/participants/{id}
    case 'GET':
      return handleGet(req, res);
    // PUT /api/participants/{id}
    case 'PUT':
      return handlePut(req, res);
    // DELETE /api/participants/{id}
    case 'DELETE':
      return handleDelete(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,PUT,DELETE').end();
  }
}
