import { useState } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../../lib/prisma';
import RTE from '../../components/Editor/RTE';

type HomeEditPageProps = {
  page: PageType;
};

const HomeEditPage: NextPage<HomeEditPageProps> = ({ page }) => {
  const [content, setContent] = useState(page.content);

  const saveData = async () => {
    await fetch('/api/pages/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: page.name, title: page.title, content }),
    });
  };

  return (
    <>
      <Link href="/">Home</Link>
      <button type="button" onClick={saveData}>
        save
      </button>
      <RTE content={content} setContent={setContent} />
    </>
  );
};

export default HomeEditPage;

export async function getServerSideProps() {
  const page = await prisma.page.findFirst({ where: { id: 1 } });

  return {
    props: {
      page,
    },
  };
}
