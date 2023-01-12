import React from 'react';
import {
  Center as MantineCenter,
  Title as MantineTitle,
  Text as MantineText,
  Stack as MantineStack,
  createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  headerContainer: {
    backgroundColor: [theme.colors[theme.primaryColor][7]],
  },
  header: {
    padding: '1rem',
    gap: '.75rem',

    '& > *': {
      textAlign: 'center',
    },

    '& > :last-child': {
      marginTop: '-.75rem',
    },
  },
  title: {
    margin: '.5rem 0 !important',
  },
}));

const Header = () => {
  const { classes } = useStyles();

  return (
    <MantineCenter className={classes.headerContainer}>
      <MantineStack className={classes.header}>
        <MantineTitle className={classes.title} order={1} c="white">
          Student workshop on scientific computing 2022
        </MantineTitle>

        <MantineTitle className={classes.title} order={2} c="orange.4">
          May 26 - 29, 2022. Děčín, Czech Rep. + Online
        </MantineTitle>

        <MantineText fz="sm" c="white">
          Departments of Software Engineering and Mathematics
        </MantineText>

        <MantineText fz="sm" c="white">
          FNSPE CTU in Prague, Czech Republic
        </MantineText>
      </MantineStack>
    </MantineCenter>
  );
};

export default Header;
