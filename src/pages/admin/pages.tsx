import { SWRConfig } from 'swr';
import type { Page } from '@prisma/client';

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
  return <AdminLayout>{page}</AdminLayout>;
};

export default PagesPage;

export async function getServerSideProps() {
  const pages = await prisma.page.findMany();

  return {
    props: {
      fallback: {
        '/api/pages': pages,
      },
    },
  };
}
