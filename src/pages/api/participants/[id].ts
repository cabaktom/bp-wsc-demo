import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import handleErrors from '../../../lib/handleApiErrors';
import { ParticipantIn, ParticipantOut } from '../../../schemas/Participant';
import { AbstractOut } from '../../../schemas/Abstract';
import { revalidatePage } from '../../../lib/revalidate';

/**
 * Handle GET requests to get a participant (with or without abstract based on query param).
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the participant, or an error message.
 */
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

/**
 * Handle PUT requests to update a participant. Revalidates the participants page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the updated participant, or an error message.
 */
const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);
    const data = ParticipantIn.parse(req.body);

    const participant = await prisma.participant.update({
      where: { id: idParsed },
      data,
    });

    await revalidatePage(res, 'participants');

    return res.status(200).json(ParticipantOut.parse(participant));
  } catch (e) {
    return handleErrors('Participant', e, res);
  }
};

/**
 * Handle DELETE requests to delete a participant. Revalidates the participants page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with no content, or an error message.
 */
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const idParsed = z.string().uuid().parse(req.query.id);

    await prisma.participant.delete({ where: { id: idParsed } });

    await revalidatePage(res, 'participants');

    return res.status(204).end();
  } catch (e) {
    return handleErrors('Participant', e, res);
  }
};

/**
 * Handle requests to /api/participants/[id]. Allowed methods: GET, PUT, DELETE.
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
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,PUT,DELETE').end();
  }
}
