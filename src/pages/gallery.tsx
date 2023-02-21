import type { NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page as PageType, Image as ImageType } from '@prisma/client';

import { prisma } from '../lib/prisma';
import MyPhotoAlbum from '../components/Image/MyPhotoAlbum';

type GalleryPageProps = {
  page: PageType;
  images: ImageType[];
};

const GalleryPage: NextPage<GalleryPageProps> = ({ page, images }) => {
  return (
    <>
      {parse(page.content)}

      <MyPhotoAlbum images={images} />
    </>
  );
};

export default GalleryPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { name: 'gallery' } });
  const settings = await prisma.siteSettings.findMany();
  const images = await prisma.image.findMany();

  return {
    props: {
      page,
      settings,
      images: JSON.parse(JSON.stringify(images)),
      contentWidth: 'xl',
    },
  };
}
