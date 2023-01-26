import { useState } from 'react';
import { Stack, Text } from '@mantine/core';
import { z } from 'zod';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import SiteSettingsForm from '../../components/Form/SiteSettingsForm';
import Header from '../../components/Header/Header';
import Paper from '../../components/Layout/Paper';
import { prisma } from '../../lib/prisma';
import { SettingOut } from '../../schemas/Setting';

type AdminDashboardPageProps = {
  settings: z.infer<typeof SettingOut>[];
};

const AdminDashboardPage: NextPageWithLayout<AdminDashboardPageProps> = ({
  settings: initialSettings,
}: AdminDashboardPageProps) => {
  const [settings, setSettings] = useState(initialSettings);

  return (
    <>
      <Stack spacing="md">
        <Paper>
          <Text size="md" mb="xs">
            Preview
          </Text>
          <Header settings={settings} />
        </Paper>

        <Paper>
          <SiteSettingsForm settings={settings} setSettings={setSettings} />
        </Paper>
      </Stack>
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
