import {
  Center as MantineCenter,
  Title as MantineTitle,
  Text as MantineText,
  Stack as MantineStack,
  createStyles,
} from '@mantine/core';
import { z } from 'zod';

import { SettingOut } from '../../schemas/Setting';

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

type HeaderProps = {
  settings: z.infer<typeof SettingOut>[];
};

const Header = ({ settings }: HeaderProps) => {
  const { classes } = useStyles();

  return (
    <MantineCenter className={classes.headerContainer}>
      <MantineStack className={classes.header}>
        <MantineTitle className={classes.title} order={1} c="white">
          {settings[0].value}
        </MantineTitle>

        <MantineTitle className={classes.title} order={2} c="orange.4">
          {settings[1].value}. {settings[2].value}
        </MantineTitle>

        <MantineText fz="sm" c="white">
          {settings[3].value}
        </MantineText>

        <MantineText fz="sm" c="white">
          {settings[4].value}
        </MantineText>
      </MantineStack>
    </MantineCenter>
  );
};

export default Header;
