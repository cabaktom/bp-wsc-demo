import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { prisma } from '../lib/prisma';

type RegisterProps = {
  page: PageType;
};

const Register: NextPage<RegisterProps> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      <Link href="/edit/register">Edit</Link>
      {parse(page.content)}
    </>
  );
};

export default Register;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 2 } });

  return {
    props: {
      page,
    },
    revalidate: 1,
  };
}
