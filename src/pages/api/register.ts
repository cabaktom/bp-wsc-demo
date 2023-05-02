import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

import { prisma } from '../../lib/prisma';
import handleErrors from '../../lib/handleApiErrors';
import { ParticipantIn, ParticipantOut } from '../../schemas/Participant';
import { AbstractIn, AbstractOut } from '../../schemas/Abstract';
import { revalidatePage } from '../../lib/revalidate';

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const participantData = ParticipantIn.parse(req.body);

    let participant: Prisma.ParticipantCreateInput;
    if (req.body.contributing) {
      const abstractData = AbstractIn.parse(req.body);
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

    await revalidatePage(res, 'participants');

    return res.status(201).json({
      ...ParticipantOut.parse(createParticipant),
      abstract: createParticipant.abstract
        ? AbstractOut.parse(createParticipant.abstract)
        : undefined,
    });
  } catch (e) {
    return handleErrors('Participant', e, res);
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
