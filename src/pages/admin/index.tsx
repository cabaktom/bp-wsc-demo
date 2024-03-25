import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Container, Paper, Title } from '@mantine/core';
import { SiteSettings } from '@prisma/client';
import type { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import SiteSettingsForm from '../../components/Form/SiteSettingsForm';
import Header from '../../components/Header/Header';
import { prisma } from '../../lib/prisma';

type AdminDashboardPageProps = {
  settings: SiteSettings[];
};

const AdminDashboardPage: NextPageWithLayout<AdminDashboardPageProps> = ({
  settings: initialSettings,
}: AdminDashboardPageProps) => {
  const [settings, setSettings] = useState(initialSettings);

  return (
    <>
      <Paper>
        <Title order={3} px="xs">
          Global header
        </Title>

        <Container fluid mb="md" p={0}>
          <Header settings={settings} />
        </Container>

        <Container size="sm" py="md" px={0}>
          <SiteSettingsForm settings={settings} setSettings={setSettings} />
        </Container>
      </Paper>
    </>
  );
};

AdminDashboardPage.getLayout = (page) => {
  return (
    <AdminLayout settings={page.props.settings} title={page.props.title}>
      {page}
    </AdminLayout>
  );
};

export default AdminDashboardPage;

export const getServerSideProps: GetServerSideProps<
  AdminDashboardPageProps
> = async (context) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    return {
      redirect: {
        destination: 'login',
        permanent: false,
      },
    };
  }

  const settings = await prisma.siteSettings.findMany({
    where: { adminId: (token.user as User).id },
  });

  return {
    props: {
      title: 'Edit header',
      settings,
    },
  };
};
