import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import handleErrors from '../../../lib/handleApiErrors';
import { AbstractIn, AbstractOut } from '../../../schemas/Abstract';
import { revalidatePage } from '../../../lib/revalidate';

/**
 * Handle GET requests to get all abstracts.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the abstracts, or an error message.
 */
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

/**
 * Handle POST requests to create an abstract. Revalidates the participants page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the created abstract, or an error message.
 */
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

    await revalidatePage(res, 'participants');

    return res.status(201).json(AbstractOut.parse(abstract));
  } catch (e) {
    return handleErrors('Abstract', e, res);
  }
};

/**
 * Handle requests to /api/abstracts. Allowed methods: GET, POST.
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
