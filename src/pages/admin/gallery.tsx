import { SWRConfig } from 'swr';
import { Stack } from '@mantine/core';
import type { Image as ImageType } from '@prisma/client';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import UploadImageForm from '../../components/Form/UploadImageForm';
import { prisma } from '../../lib/prisma';
import AdminImageGrid from '../../components/Image/Admin/AdminImageGrid';

type GalleryPageProps = {
  fallback: {
    '/api/images': ImageType[];
  };
};

const GalleryPage: NextPageWithLayout<GalleryPageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Stack>
        <UploadImageForm />

        <AdminImageGrid />
      </Stack>
    </SWRConfig>
  );
};

GalleryPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default GalleryPage;

export async function getServerSideProps() {
  const images = await prisma.image.findMany();

  return {
    props: {
      fallback: {
        '/api/images': JSON.parse(JSON.stringify(images)),
      },
    },
  };
}
