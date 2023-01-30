import Link from 'next/link';
import { createStyles, Title, Text, Container, Group } from '@mantine/core';

import type { NextPageWithLayout } from '../@types';
import Button from '../components/Button/Button';

const useStyles = createStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor,
    }).background,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    color: theme.colors[theme.primaryColor][3],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,
    color: theme.white,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][1],
  },
}));

const NotFoundPage: NextPageWithLayout = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root} fluid>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Nothing to see here.</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Page you are trying to open does not exist. You may have mistyped the
        address, or the page has been moved to another URL
      </Text>
      <Group position="center">
        <Link href="/">
          <Button variant="white" size="md">
            Take me back to home page
          </Button>
        </Link>
      </Group>
    </Container>
  );
};

NotFoundPage.getLayout = (page) => page;

export default NotFoundPage;
