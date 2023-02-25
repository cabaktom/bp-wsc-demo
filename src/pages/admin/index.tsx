import { useState } from 'react';
import { Container, Paper, Title } from '@mantine/core';
import { z } from 'zod';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import SiteSettingsForm from '../../components/Form/SiteSettingsForm';
import Header from '../../components/Header/Header';
import { prisma } from '../../lib/prisma';
import type { SettingOut } from '../../schemas/Setting';

type AdminDashboardPageProps = {
  settings: z.infer<typeof SettingOut>[];
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
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminDashboardPage;

export async function getServerSideProps() {
  const settings = await prisma.siteSettings.findMany();

  return {
    props: { settings },
  };
}
