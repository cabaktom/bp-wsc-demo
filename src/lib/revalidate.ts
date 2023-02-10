import { NextApiResponse } from 'next';

import links from '../constants/links';

export const revalidateSettings = async (res: NextApiResponse) => {
  const revalidatePromises = links.map((link) => res.revalidate(link.url));
  await Promise.all([revalidatePromises, res.revalidate('/login')]);
};

export const revalidateParticipants = async (res: NextApiResponse) => {
  await Promise.all([res.revalidate('/participants')]);
};

export const revalidatePage = async (res: NextApiResponse, url: string) => {
  await Promise.all([res.revalidate(url)]);
};
