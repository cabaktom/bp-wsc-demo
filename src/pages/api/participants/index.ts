import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import handleErrors from '../../../lib/handleApiErrors';
import { ParticipantIn, ParticipantOut } from '../../../schemas/Participant';
import { AbstractOut } from '../../../schemas/Abstract';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { abstract } = req.query;

  try {
    const participants = await prisma.participant.findMany({
      orderBy: { id: 'asc' },
      include: { abstract: abstract !== 'false' },
    });
    const participantsOut = participants.map((participant) => {
      return {
        ...ParticipantOut.parse(participant),
        abstract: participant.abstract
          ? AbstractOut.parse(participant.abstract)
          : undefined,
      };
    });

    return res.status(200).json(participantsOut);
  } catch (e) {
    return handleErrors('Participant', e, res);
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = ParticipantIn.parse(req.body);

    const participant = await prisma.participant.create({
      data,
    });

    return res.status(201).json(ParticipantOut.parse(participant));
  } catch (e) {
    return handleErrors('Participant', e, res);
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ids } = req.query;
  if (!ids) return res.status(400).json({ message: 'Missing ids.' });

  try {
    const idsNum =
      ids
        .toString()
        .split(',')
        .map((id) => z.number().int().parse(Number(id))) ?? [];

    await prisma.participant.deleteMany({
      where: { id: { in: idsNum } },
    });

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
    // GET /api/participants
    case 'GET':
      return handleGet(req, res);
    // POST /api/participants
    case 'POST':
      return handlePost(req, res);
    // DELETE /api/participants?ids=<ids>
    case 'DELETE':
      return handleDelete(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,POST,DELETE').end();
  }
}
