import type { NextPage } from 'next';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { Paper } from '@mantine/core';

import { prisma } from '../lib/prisma';
import RegisterForm from '../components/Form/RegisterForm';

type RegisterPageProps = {
  page: PageType;
};

const RegisterPage: NextPage<RegisterPageProps> = ({ page }) => {
  return (
    <>
      {parse(page.content)}

      <Paper>
        <RegisterForm
          participantTitle="Personal data"
          abstractTitle="Your contribution"
        />
      </Paper>
    </>
  );
};

export default RegisterPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { name: 'register' } });
  const settings = await prisma.siteSettings.findMany();

  return {
    props: {
      page,
      settings,
    },
  };
}
