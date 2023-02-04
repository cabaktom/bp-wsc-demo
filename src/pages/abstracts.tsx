import { NextPage } from 'next';
import Head from 'next/head';
import parse from 'html-react-parser';
import type { Page as PageType } from '@prisma/client';
import { Title } from '@mantine/core';

import { prisma } from '../lib/prisma';
import MyPaper from '../components/Layout/MyPaper';

type AbstractsPageProps = {
  page: PageType;
  abstracts: {
    id: number;
    title: string;
    abstract: string;
    additionalAuthors: string;
    affiliationAuthors: string;
    participant: {
      fullName: string;
      affiliation: string;
    };
  }[];
};

const AbstractsPage: NextPage<AbstractsPageProps> = ({ page, abstracts }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      {parse(page.content)}

      {abstracts.map((abstract) => (
        <div key={abstract.id} id={abstract.id.toString()}>
          <MyPaper>
            <Title order={5}>{abstract.title}</Title>
            <p>
              {abstract.participant.fullName}
              {abstract.additionalAuthors
                ? `, ${abstract.additionalAuthors}`
                : ''}
            </p>
            <p>
              {abstract.participant.affiliation}
              {abstract.affiliationAuthors
                ? `, ${abstract.affiliationAuthors}`
                : ''}
            </p>
            <strong>Abstract:</strong>
            <p>{abstract.abstract}</p>
          </MyPaper>
        </div>
      ))}
    </>
  );
};

export default AbstractsPage;

export async function getStaticProps() {
  const page = await prisma.page.findFirst({ where: { id: 4 } });
  const settings = await prisma.siteSettings.findMany();
  const abstracts = await prisma.abstract.findMany({
    select: {
      id: true,
      title: true,
      abstract: true,
      additionalAuthors: true,
      affiliationAuthors: true,
      participant: {
        select: {
          fullName: true,
          affiliation: true,
        },
      },
    },
  });

  return {
    props: {
      page,
      settings,
      abstracts,
    },
  };
}
