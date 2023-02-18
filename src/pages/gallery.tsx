import { Title as MantineTitle } from '@mantine/core';
import type { NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../lib/prisma';

type GalleryPageProps = {
  page: PageType;
};

const GalleryPage: NextPage<GalleryPageProps> = ({ page }) => {
  return (
    <>
      {parse(page.content)}
    </>
  );
};

export default GalleryPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { name: 'gallery' } });
  const settings = await prisma.siteSettings.findMany();

  return {
    props: {
      page,
      settings,
    },
  };
}
