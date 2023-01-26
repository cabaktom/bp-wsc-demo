import type { NextApiRequest, NextApiResponse } from 'next';

import links from '../../constants/links';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const revalidatePromises = links.map((link) => res.revalidate(link.url));
    await Promise.all([revalidatePromises, res.revalidate('/login')]);

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
