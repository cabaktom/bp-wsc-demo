import { Title as MantineTitle } from '@mantine/core';
import type { NextPage } from 'next';

import { prisma } from '../lib/prisma';

const GalleryPage: NextPage = () => {
  return (
    <>
      <MantineTitle order={2}>Gallery page</MantineTitle>
    </>
  );
};

export default GalleryPage;

export async function getStaticProps() {
  const settings = await prisma.siteSettings.findMany();

  return {
    props: {
      settings,
    },
    revalidate: 1,
  };
}
