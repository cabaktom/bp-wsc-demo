import { SWRConfig } from 'swr';
import type { Page } from '@prisma/client';
import { GetServerSideProps } from 'next';
import type { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import { prisma } from '../../lib/prisma';
import PagesList from '../../components/List/PagesList';

type PagesPageProps = {
  fallback: {
    '/api/pages': Page[];
  };
};

const PagesPage: NextPageWithLayout<PagesPageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <PagesList pages={fallback['/api/pages']} />
    </SWRConfig>
  );
};

PagesPage.getLayout = (page) => {
  return (
    <AdminLayout settings={page.props.settings} title={page.props.title}>
      {page}
    </AdminLayout>
  );
};

export default PagesPage;

export const getServerSideProps: GetServerSideProps<PagesPageProps> = async (
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

  const pages = await prisma.page.findMany({
    where: { adminId: (token.user as User).id },
  });
  const settings = await prisma.siteSettings.findMany({
    where: { adminId: (token.user as User).id },
  });

  return {
    props: {
      fallback: {
        '/api/pages': pages,
      },
      title: 'Edit pages',
      settings,
    },
  };
};
