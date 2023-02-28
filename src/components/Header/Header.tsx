import { Center, Title, Text, Stack, createStyles } from '@mantine/core';
import type { SiteSettings } from '@prisma/client';

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
  settings: SiteSettings[];
};

const Header = ({ settings }: HeaderProps) => {
  const { classes } = useStyles();

  const settingsObj = settings.reduce((acc, setting) => {
    acc[setting.option as keyof SiteSettings] = setting.value;
    return acc;
  }, {} as { [key in keyof SiteSettings]: string });

  return (
    <Center className={classes.headerContainer}>
      <Stack className={classes.header}>
        <Title className={classes.title} order={1} c="white">
          {settingsObj['title' as keyof SiteSettings]}
        </Title>

        <Title className={classes.title} order={2} c="orange.4">
          {settingsObj['date' as keyof SiteSettings]}{' '}
          {settingsObj['location' as keyof SiteSettings]}
        </Title>

        <Text fz="sm" c="white">
          {settingsObj['address department' as keyof SiteSettings]}
        </Text>

        <Text fz="sm" c="white">
          {settingsObj['address faculty' as keyof SiteSettings]}
        </Text>
      </Stack>
    </Center>
  );
};

export default Header;
