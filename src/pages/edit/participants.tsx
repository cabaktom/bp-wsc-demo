import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import type { Page as PageType } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import RTE from '../../components/Editor/RTE';

type ParticipantsEditProps = {
  page: PageType;
};

const ParticipantsEdit: NextPage<ParticipantsEditProps> = ({ page }) => {
  const [content, setContent] = useState(page.content);

  const saveData = async () => {
    await fetch('/api/pages/3', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: page.name, title: page.title, content }),
    });
  };

  return (
    <>
      <Link href="/participants">Back</Link>
      <button type="button" onClick={saveData}>
        save
      </button>
      <RTE content={content} setContent={setContent} />
    </>
  );
};

export default ParticipantsEdit;

export async function getServerSideProps() {
  const page = await prisma.page.findFirst({ where: { id: 3 } });

  return {
    props: {
      page,
    },
  };
}
