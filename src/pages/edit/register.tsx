import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import type { Page as PageType } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import RTE from '../../components/Editor/RTE';

type RegisterEditProps = {
  page: PageType;
};

const RegisterEdit: NextPage<RegisterEditProps> = ({ page }) => {
  const [content, setContent] = useState(page.content);

  const saveData = async () => {
    await fetch('/api/pages/2', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: page.name, title: page.title, content }),
    });
  };

  return (
    <>
      <Link href="/register">Back</Link>
      <button type="button" onClick={saveData}>
        save
      </button>
      <RTE content={content} setContent={setContent} />
    </>
  );
};

export default RegisterEdit;

export async function getServerSideProps() {
  const page = await prisma.page.findFirst({ where: { id: 2 } });

  return {
    props: {
      page,
    },
  };
}
