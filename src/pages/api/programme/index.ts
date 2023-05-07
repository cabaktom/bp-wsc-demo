import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { Prisma } from '@prisma/client';

import { prisma } from '../../../lib/prisma';
import handleErrors from '../../../lib/handleApiErrors';
import { ProgrammeIn, ProgrammeOut } from '../../../schemas/Programme';
import { PROGRAMME_ID } from '../../../constants/programme';
import { revalidatePage } from '../../../lib/revalidate';

/**
 * Handle GET requests to get the programme.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the programme, or an error message.
 */
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const programme = await prisma.programme.findUnique({
      where: { id: PROGRAMME_ID },
      include: {
        days: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!programme) {
      return res.status(404).json({ message: 'Programme not found.' });
    }

    return res.status(200).json(ProgrammeOut.parse(programme));
  } catch (e) {
    return handleErrors('Programme', e, res);
  }
};

/**
 * Handle PUT requests to create or update the programme. Revalidates the programme page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the created or updated programme, or an error message.
 */
const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { conferenceStart, days } = ProgrammeIn.parse(req.body);

    // create or update programme
    const programme = await prisma.programme.upsert({
      where: { id: PROGRAMME_ID },
      update: {
        conferenceStart,
      },
      create: {
        id: PROGRAMME_ID,
        conferenceStart,
      },
    });

    // create days and items, connect to programme
    const dayTransactions = days.map((day) => {
      return prisma.programmeDay.create({
        data: {
          ...day,

          items: {
            createMany: {
              data: day.items.map((item) => {
                if (item.type === 'CHAIRMAN') {
                  const { type, id, abstractId, participantId } = item;
                  return { type, id, participantId, abstractId };
                }

                // type === 'ITEM'
                const { type, id, duration, title, abstractId, participantId } =
                  item;
                return {
                  type,
                  id,
                  duration,
                  title,
                  participantId,
                  abstractId,
                };
              }),
            },
          },

          programmeId: programme.id,
        },
      });
    });

    await prisma.$transaction([
      prisma.programmeDayItem.deleteMany({}),
      prisma.programmeDay.deleteMany({}),
      ...dayTransactions,
    ]);

    await revalidatePage(res, 'programme');

    const programmeWithDays = await prisma.programme.findUnique({
      where: { id: PROGRAMME_ID },
      include: {
        days: {
          include: {
            items: true,
          },
        },
      },
    });

    return res.status(200).json(ProgrammeOut.parse(programmeWithDays));
  } catch (e) {
    return handleErrors('Programme', e, res);
  }
};

/**
 * Handle DELETE requests to delete the programme. Revalidates the programme page.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with no content, or an error message.
 */
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await prisma.$transaction([
      prisma.programmeDayItem.deleteMany({}),
      prisma.programmeDay.deleteMany({}),
      prisma.programme.delete({ where: { id: PROGRAMME_ID } }),
    ]);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code !== 'P2025'
    ) {
      return handleErrors('Programme', e, res);
    }
  }

  await revalidatePage(res, 'programme');

  return res.status(204).end();
};

/**
 * Handle requests to /api/programme. Allowed methods: GET, PUT, DELETE.
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
