import { SWRConfig } from 'swr';
import { Stack } from '@mantine/core';
import type { Image as ImageType } from '@prisma/client';
import { GetServerSideProps } from 'next';
import type { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

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
  return (
    <AdminLayout settings={page.props.settings} title={page.props.title}>
      {page}
    </AdminLayout>
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
        destination: '/login',
        permanent: false,
      },
    };
  }

  const images = await prisma.image.findMany({
    where: { adminId: (token.user as User).id },
  });
  const settings = await prisma.siteSettings.findMany({
    where: { adminId: (token.user as User).id },
  });

  return {
    props: {
      fallback: {
        '/api/images': JSON.parse(JSON.stringify(images)),
      },
      title: 'Edit gallery',
      settings,
    },
  };
};
