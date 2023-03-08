import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { prisma } from '../../lib/prisma';
import handleErrors from '../../lib/handleApiErrors';
import { ProgrammeIn, ProgrammeOut } from '../../schemas/Programme';

const PROGRAMME_ID = 'programme';

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
          id: day.id,
          date: day.date,
          start: day.start,
          end: day.end,

          items: {
            createMany: {
              data: day.items.map((item) => ({
                id: item.id,
                duration: item.duration,
                title: item.title,
                participantId: item.participantId,
                abstractId: item.abstractId,
              })),
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

    // TODO: revalidate programme
    // await revalidateProgramme(res);

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

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.$transaction([
    prisma.programmeDayItem.deleteMany({}),
    prisma.programmeDay.deleteMany({}),
    prisma.programme.delete({ where: { id: PROGRAMME_ID } }),
  ]);

  return res.status(204).end();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // authenticate user
  const token = await getToken({ req });
  if (!token || !token.sub) return res.status(401).end();

  switch (req.method) {
    // GET /api/programme
    case 'GET':
      return handleGet(req, res);
    // POST /api/programme
    case 'PUT':
      return handlePut(req, res);
    // DELETE /api/programme
    case 'DELETE':
      return handleDelete(req, res);

    default:
      return res.status(405).setHeader('Allow', 'GET,PUT').end();
  }
}
