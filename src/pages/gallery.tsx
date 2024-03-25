import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { LoadingOverlay, Paper, Text } from '@mantine/core';
import type { Photo } from 'react-photo-album';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

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

export const getServerSideProps: GetServerSideProps<GalleryPageProps> = async (
  context,
) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    };
  }

  const page = await prisma.page.findUnique({
    where: { name: `gallery_${(token.user as User).id}` },
  });
  if (!page) return { notFound: true };

  const settings = await prisma.siteSettings.findMany({
    where: { adminId: (token.user as User).id },
  });

  const images = await prisma.image.findMany({
    where: { adminId: (token.user as User).id },
    orderBy: { uploadedAt: 'desc' },
  });

  // convert images to react-photo-album format
  const albumImages = images.map((image, index) => {
    return {
      src: `/api/images/download/${encodeURIComponent(image.filename)}`,
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
  };
};
