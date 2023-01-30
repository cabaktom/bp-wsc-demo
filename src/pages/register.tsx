import type { NextPage } from 'next';
import Head from 'next/head';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../lib/prisma';
import RegisterForm from '../components/Form/RegisterForm';

type RegisterPageProps = {
  page: PageType;
};

const RegisterPage: NextPage<RegisterPageProps> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      {parse(page.content)}

      <RegisterForm />
    </>
  );
};

export default RegisterPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 2 } });
  const settings = await prisma.siteSettings.findMany();

  return {
    props: {
      page,
      settings,
    },
  };
}
