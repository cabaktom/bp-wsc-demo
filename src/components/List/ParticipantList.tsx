import { Flex, Text, ThemeIcon, Title, createStyles } from '@mantine/core';
import type { Abstract, Participant } from '@prisma/client';
import { IconUserCircle } from '@tabler/icons-react';

import MyPaper from '../Layout/MyPaper';

const useStyles = createStyles((theme) => ({
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    padding: '0 !important',
    marginTop: theme.spacing.xl,
  },
  definitionList: {
    '& dt': {
      fontWeight: 'bold',
    },
    '& dd:not(:last-of-type)': {
      marginBottom: theme.spacing.xs,
    },
  },
}));

type ParticipantListProps = {
  participants: (Participant & {
    abstract: Abstract | null;
  })[];
};

const ParticipantList = ({ participants }: ParticipantListProps) => {
  const { classes } = useStyles();

  return (
    <ul className={classes.list}>
      {participants.map(({ abstract, ...participant }) => (
        <li key={participant.fullName}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 0, md: 'sm' }}
          >
            <Flex
              direction="row"
              gap="sm"
              w={{ base: '100%', md: '30%' }}
              my={{ base: 'xs', md: 'sm' }}
              mx={{ base: 'xs', md: 0 }}
            >
              <ThemeIcon size={30} radius="md">
                <IconUserCircle />
              </ThemeIcon>
              <Flex direction="column">
                <Text weight="bold" size="lg">
                  {participant.fullName}
                </Text>
                {participant.affiliation}
              </Flex>
            </Flex>

            <MyPaper
              w={{ base: '100%', md: '70%' }}
              bg={abstract ? '' : 'gray.0'}
            >
              {abstract && (
                <>
                  <Title order={4}>{abstract.title}</Title>
                  <dl className={classes.definitionList}>
                    {abstract.additionalAuthors && (
                      <>
                        <dt>Additional authors: </dt>
                        <dd>{abstract.additionalAuthors}</dd>
                      </>
                    )}
                    {abstract.affiliationAuthors && (
                      <>
                        <dt>Additional authors&apos; affiliation:</dt>
                        <dd>{abstract.affiliationAuthors}</dd>
                      </>
                    )}
                    {abstract.abstract && (
                      <>
                        <dt>Abstract: </dt>
                        <dd>{abstract.abstract}</dd>
                      </>
                    )}
                  </dl>
                </>
              )}
              {!abstract && (
                <Flex align="center" h="100%">
                  No abstract submitted.
                </Flex>
              )}
            </MyPaper>
          </Flex>
        </li>
      ))}
    </ul>
  );
};

export default ParticipantList;
