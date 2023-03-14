import Link from 'next/link';
import {
  Badge,
  Flex,
  Grid,
  Text,
  Title,
  clsx,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import type { Abstract, Participant } from '@prisma/client';
import parse from 'html-react-parser';
import { IconClock, IconUser } from '@tabler/icons-react';

import type {
  ChairmanItemType,
  DayType,
  ItemType,
  ProgrammeType,
} from '../../@types/programme';
import { dateFormat, locale, timeFormat } from '../../constants/date';

const useStyles = createStyles((theme) => ({
  list: {
    listStyle: 'none',
    padding: '0 !important',
  },

  programme: {
    marginTop: '5rem',
  },

  itemList: {
    marginTop: theme.spacing.md,

    '& > *:nth-of-type(odd)': {
      backgroundColor: theme.colors.gray[0],
    },
  },

  day: {
    border: `thin solid ${theme.colors.gray[3]}`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    marginBottom: '1rem !important',
  },

  listItem: {
    padding: '0 1rem',
  },

  dayItem: {},

  dayChairmanItem: {
    padding: '1.75rem 1rem .75rem 1rem',
  },

  badgeContainer: {
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      position: 'absolute',
      top: theme.spacing.xs,
      right: 0,
    },
  },
}));

export type Item = ItemType & {
  participant: Participant;
  abstract: Abstract;
  startTime: Date;
  endTime: Date;
};

export type ChairmanItem = ChairmanItemType & {
  participant: Participant;
};

type ProgrammeListProps = {
  programme: ProgrammeType & {
    days: (DayType & {
      items: (Item | ChairmanItem)[];
    })[];
  };
};

const ProgrammeList = ({ programme }: ProgrammeListProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <ul className={clsx(classes.list, classes.programme)}>
      {programme.days.map((day) => {
        const date = new Date(day.date).toLocaleDateString(locale, dateFormat);

        return (
          <li className={classes.day} key={day.id}>
            <Title order={3} mt="0 !important">
              {date}
            </Title>

            {parse(day.additionalInfo)}

            <ul className={clsx(classes.list, classes.itemList)}>
              {day.items.map((item) => {
                if (item.type === 'CHAIRMAN') {
                  const { id, participant } = item as ChairmanItem;

                  return (
                    <li
                      className={clsx(
                        classes.listItem,
                        classes.dayChairmanItem,
                      )}
                      key={id}
                    >
                      <Flex align="center" gap="xs">
                        <IconUser size={18} />
                        <Text>
                          <strong>Chair: {participant.fullName}</strong>
                        </Text>
                      </Flex>
                    </li>
                  );
                }

                const { id, startTime, endTime, title, participant, abstract } =
                  item as Item;

                return (
                  <li
                    className={clsx(classes.listItem, classes.dayItem)}
                    key={id}
                  >
                    <Flex wrap="nowrap" pos="relative">
                      <Grid columns={16} w="100%" gutter="xs" my="xs">
                        <Grid.Col span={16} sm={4} md={3} py={0}>
                          <Flex align="center" gap="xs">
                            <IconClock size={16} />{' '}
                            <Text>
                              {new Date(startTime).toLocaleTimeString(
                                locale,
                                timeFormat,
                              )}{' '}
                              -{' '}
                              {new Date(endTime).toLocaleTimeString(
                                locale,
                                timeFormat,
                              )}
                            </Text>
                          </Flex>
                        </Grid.Col>

                        {title && (
                          <Grid.Col
                            span={11}
                            offset={1}
                            sm={12}
                            offsetSm={0}
                            md={13}
                            offsetMd={0}
                            py={0}
                          >
                            <Text fs="italic">{title}</Text>
                          </Grid.Col>
                        )}

                        <Grid.Col
                          span={15}
                          offset={1}
                          sm={4}
                          offsetSm={!title ? 0 : 4}
                          md={5}
                          offsetMd={!title ? 0 : 3}
                          py={0}
                        >
                          <Text fz="md">{participant?.fullName}</Text>
                        </Grid.Col>

                        <Grid.Col
                          span={15}
                          offset={1}
                          sm={12}
                          offsetSm={4}
                          md={8}
                          offsetMd={0}
                          py={0}
                        >
                          {abstract && (
                            <Link
                              href={`/participants?abstract=${abstract.title}`}
                              scroll={false}
                            >
                              {abstract.title}
                            </Link>
                          )}
                        </Grid.Col>
                      </Grid>

                      <Flex
                        className={classes.badgeContainer}
                        direction="row"
                        gap={6}
                        align={{ base: 'start', xs: 'center' }}
                        pl="xs"
                        py={{ base: 0, sm: theme.spacing.xs }}
                        w="8rem"
                        justify="center"
                        wrap="wrap"
                      >
                        {(participant?.invited ||
                          participant?.participation === 'ONLINE') && (
                          <>
                            {participant?.invited && (
                              <Badge variant="filled">Invited</Badge>
                            )}
                            {participant?.participation === 'ONLINE' && (
                              <Badge color="green" variant="filled">
                                {participant?.participation}
                              </Badge>
                            )}
                          </>
                        )}
                      </Flex>
                    </Flex>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default ProgrammeList;
