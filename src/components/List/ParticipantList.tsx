import {
  Paper,
  CloseButton,
  Flex,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  createStyles,
  Select,
} from '@mantine/core';
import type { Abstract, Participant } from '@prisma/client';
import { IconUserCircle } from '@tabler/icons-react';

import useSearch from '../../hooks/useSearch';
import useSort from '../../hooks/useSort';

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
    lastName: string;
  })[];
};

const ParticipantList = ({ participants }: ParticipantListProps) => {
  const { classes } = useStyles();

  // data pipeline: search -> sort
  const { query, setQuery, searchResults } = useSearch({
    data: participants,
  });
  const { sortStatus, setSortStatus, sortResults } = useSort({
    data: searchResults,
    initialSortStatus: {
      accessor: 'lastName',
      direction: 'asc',
    },
  });

  return (
    <>
      <Flex direction={{ base: 'column', sm: 'row' }} gap="sm" wrap="nowrap">
        <TextInput
          label="Search"
          placeholder="Search participants and abstracts"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          rightSection={<CloseButton size={18} onClick={() => setQuery('')} />}
          w="100%"
        />

        <Select
          label="Sort by"
          placeholder="Sort by"
          value={`${sortStatus?.accessor},${sortStatus?.direction}`}
          onChange={(value) => {
            setSortStatus({
              accessor: value!.split(',')[0],
              direction: value!.split(',')[1] as 'asc' | 'desc',
            });
          }}
          data={[
            { label: 'Last name (asc)', value: 'lastName,asc' },
            { label: 'Last name (desc)', value: 'lastName,desc' },
            { label: 'Abstract title (asc)', value: 'abstract.title,asc' },
            { label: 'Abstract title (desc)', value: 'abstract.title,desc' },
          ]}
          miw="18rem"
        />
      </Flex>

      <ul className={classes.list}>
        {sortResults.map(({ abstract, ...participant }) => (
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

              <Paper
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
              </Paper>
            </Flex>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ParticipantList;
