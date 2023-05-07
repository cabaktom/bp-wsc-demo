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

/**
 * Handle POST requests to create a participant. Revalidates the participants page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the created participant, or an error message.
 */
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = ParticipantIn.parse(req.body);

    const participant = await prisma.participant.create({
      data,
    });

    await revalidatePage(res, 'participants');

    return res.status(201).json(ParticipantOut.parse(participant));
  } catch (e) {
    return handleErrors('Participant', e, res);
  }
};

/**
 * Handle DELETE requests to delete a list of participants. The ids are required, separated by commas and passed as a query param. Revalidates the participants page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the deleted participant, or an error message.
 */
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ids } = req.query;
  if (!ids) return res.status(400).json({ message: 'Missing ids.' });

  try {
    const idsNum =
      ids
        .toString()
        .split(',')
        .map((id) => z.string().uuid().parse(id)) ?? [];

    await prisma.participant.deleteMany({
      where: { id: { in: idsNum } },
    });

    await revalidatePage(res, 'participants');

    return res.status(204).end();
  } catch (e) {
    return handleErrors('Participant', e, res);
  }
};

/**
 * Handle requests to /api/participants. Allowed methods: GET, POST, DELETE.
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
    case 'DELETE':
      return handleDelete(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,POST,DELETE').end();
  }
}
