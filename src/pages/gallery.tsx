import { useState } from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { LoadingOverlay, Paper, Text } from '@mantine/core';
import type { Photo } from 'react-photo-album';

import { prisma } from '../lib/prisma';
import MyPhotoAlbum from '../components/Image/MyPhotoAlbum';

const MyLightbox = dynamic(() => import('../components/Image/MyLightbox'), {
  loading: () => (
    <LoadingOverlay
      visible
      loaderProps={{ color: 'materialBlue.4' }}
      overlayOpacity={0.7}
      overlayColor="#222"
      pos="fixed"
    />
  ),
});

type GalleryPageProps = {
  page: PageType;
  images: (Photo & {
    index: number;
  })[];
};

const GalleryPage: NextPage<GalleryPageProps> = ({ page, images }) => {
  const [index, setIndex] = useState(-1);
  const [interactive, setInteractive] = useState(false);

  return (
    <>
      {parse(page?.content ?? '')}

      {images.length === 0 && (
        <Paper mt="xl">
          <Text align="center">There are no images.</Text>
        </Paper>
      )}
      {images.length > 0 && (
        <>
          <MyPhotoAlbum
            images={images}
            setIndex={setIndex}
            setInteractive={setInteractive}
          />

          {interactive && (
            <MyLightbox
              images={images}
              open={index >= 0}
              index={index}
              setIndex={setIndex}
            />
          )}
        </>
      )}
    </>
  );
};

export default GalleryPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { name: 'gallery' } });
  const settings = await prisma.siteSettings.findMany();
  const images = await prisma.image.findMany();

  const albumImages = images.map((image, index) => {
    return {
      src: `/api/download${image.path}`,
      width: image.width,
      height: image.height,
      alt: image.alt || 'Image',
      index,
      description: image.alt,
      downloadFilename: image.originalFilename,
    };
  });

  return {
    props: {
      page,
      settings,
      images: JSON.parse(JSON.stringify(albumImages)),
      contentWidth: 'xl',
    },
    revalidate: 5,
  };
}
