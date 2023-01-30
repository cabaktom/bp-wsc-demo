import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

import { prisma } from '../../lib/prisma';
import handleErrors from '../../lib/handleApiErrors';
import { Participant } from '../../schemas/Participant';
import { Abstract } from '../../schemas/Abstract';
import { revalidateParticipants } from '../../lib/revalidate';

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const participantData = Participant.parse(req.body);

    let participant: Prisma.ParticipantCreateInput;
    if (req.body.contributing) {
      const abstractData = Abstract.parse(req.body);
      participant = {
        ...participantData,
        abstract: {
          create: {
            ...abstractData,
          },
        },
      };
    } else {
      participant = {
        ...participantData,
      };
    }

    const createParticipant = await prisma.participant.create({
      data: participant,
      include: {
        abstract: true,
      },
    });

    await revalidateParticipants(res);

    return res.status(201).json(createParticipant);
  } catch (e) {
    return handleErrors('Administrator', e, res);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    // POST /api/register
    case 'POST':
      return handlePost(req, res);

    default:
      return res.status(405).setHeader('Allow', 'POST').end();
  }
}
