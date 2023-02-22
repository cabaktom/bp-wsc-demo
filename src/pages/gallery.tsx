import { useState } from 'react';
import type { NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page as PageType, Image as ImageType } from '@prisma/client';

import { prisma } from '../lib/prisma';
import MyPhotoAlbum from '../components/Image/MyPhotoAlbum';
import MyLightbox from '../components/Image/MyLightbox';

type GalleryPageProps = {
  page: PageType;
  images: ImageType[];
};

const GalleryPage: NextPage<GalleryPageProps> = ({ page, images }) => {
  const [index, setIndex] = useState(-1);
  const albumImages = images.map((image, index) => {
    return {
      src: image.path,
      width: image.width,
      height: image.height,
      alt: image.alt || 'Image',
      index,
      description: image.alt,
    };
  });

  return (
    <>
      {parse(page.content)}

      <MyPhotoAlbum images={albumImages} setIndex={setIndex} />

      <MyLightbox
        images={albumImages}
        open={index >= 0}
        index={index}
        setIndex={setIndex}
      />
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
