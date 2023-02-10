import type { NextPage } from 'next';
import Link from 'next/link';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../lib/prisma';

type ProgrammePageProps = {
  page: PageType;
};

const ProgrammePage: NextPage<ProgrammePageProps> = ({ page }) => {
  return (
    <>
      <Link href="/edit/programme">Edit</Link>
      {parse(page.content)}
    </>
  );
};

export default ProgrammePage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 5 } });
  const settings = await prisma.siteSettings.findMany();

  return {
    props: {
      page,
      settings,
    },
  };
}
