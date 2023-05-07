import { NextApiResponse } from 'next';

import links from '../constants/links';

/**
 * Revalidate all pages in navigation when the global settings change.
 *
 * @param res The response object.
 */
export const revalidateSettings = async (res: NextApiResponse) => {
  const revalidatePromises = links.map((link) => res.revalidate(link.url));
  await Promise.all([revalidatePromises, res.revalidate('/login')]);
};

/**
 * Revalidate a page based on its URL.
 *
 * @param res The response object.
 * @param page The URL of the page to revalidate.
 */
export const revalidatePage = async (res: NextApiResponse, page: string) => {
  const url = `/${page === 'home' ? '' : page}`;
  await Promise.all([res.revalidate(url)]);
};
