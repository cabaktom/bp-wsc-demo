import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { Prisma } from '@prisma/client';

import { prisma } from '../../../lib/prisma';
import handleErrors from '../../../lib/handleApiErrors';
import { ProgrammeIn, ProgrammeOut } from '../../../schemas/Programme';
// import { revalidatePage } from '../../../lib/revalidate';

/**
 * Handle GET requests to get the programme.
 *
 * @param req The request object.
 * @param res The response object.
 *
 * @returns A response with the programme, or an error message.
 */
const handleGet = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
) => {
  try {
    const programme = await prisma.programme.findUnique({
      where: { id: `programme_${userId}` },
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
const handlePut = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
) => {
  try {
    const { conferenceStart, days } = ProgrammeIn.parse(req.body);

    // create or update programme
    const programme = await prisma.programme.upsert({
      where: { id: `programme_${userId}` },
      update: {
        conferenceStart,
      },
      create: {
        id: `programme_${userId}`,
        conferenceStart,
        adminId: userId,
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
                  return {
                    type,
                    id,
                    participantId,
                    abstractId,
                    adminId: userId,
                  };
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
                  adminId: userId,
                };
              }),
            },
          },

          programmeId: programme.id,
          adminId: userId,
        },
      });
    });

    await prisma.$transaction([
      prisma.programmeDayItem.deleteMany({
        where: { adminId: userId },
      }),
      prisma.programmeDay.deleteMany({
        where: { adminId: userId },
      }),
      ...dayTransactions,
    ]);

    // await revalidatePage(res, 'programme'); // Disabled in the demo

    const programmeWithDays = await prisma.programme.findUnique({
      where: { id: `programme_${userId}` },
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
const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
) => {
  try {
    await prisma.$transaction([
      prisma.programmeDayItem.deleteMany({
        where: { adminId: userId },
      }),
      prisma.programmeDay.deleteMany({
        where: { adminId: userId },
      }),
      prisma.programme.delete({ where: { id: `programme_${userId}` } }),
    ]);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code !== 'P2025'
    ) {
      return handleErrors('Programme', e, res);
    }
  }

  // await revalidatePage(res, 'programme'); // Disabled in the demo

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

  const userId = (token.user as User).id;

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, userId);
    case 'PUT':
      return handlePut(req, res, userId);
    case 'DELETE':
      return handleDelete(req, res, userId);

    default:
      return res.status(405).setHeader('Allow', 'GET,PUT,DELETE').end();
  }
}
