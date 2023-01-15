import { useState } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import type { Page as PageType } from '@prisma/client';

import { prisma } from '../../lib/prisma';
import RTE from '../../components/Editor/RTE';

type TravelEditPageProps = {
  page: PageType;
};

const TravelEditPage: NextPage<TravelEditPageProps> = ({ page }) => {
  const [content, setContent] = useState(page.content);

  const saveData = async () => {
    await fetch('/api/pages/6', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: page.name, title: page.title, content }),
    });
  };

  return (
    <>
      <Link href="/travel">Back</Link>
      <button type="button" onClick={saveData}>
        save
      </button>
      <RTE content={content} setContent={setContent} />
    </>
  );
};

export default TravelEditPage;

export async function getServerSideProps() {
  const page = await prisma.page.findFirst({ where: { id: 6 } });

  return {
    props: {
      page,
    },
  };
}
