import { NextApiResponse } from 'next';

import links from '../constants/links';

export const revalidateSettings = async (res: NextApiResponse) => {
  const revalidatePromises = links.map((link) => res.revalidate(link.url));
  await Promise.all([revalidatePromises, res.revalidate('/login')]);
};

export const revalidatePage = async (res: NextApiResponse, page: string) => {
  const url = `/${page === 'home' ? '' : page}`;
  await Promise.all([res.revalidate(url)]);
};
