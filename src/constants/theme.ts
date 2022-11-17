import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'blue',
  defaultRadius: 0,
  globalStyles: (theme) => ({
    '*, *::after, *::before': {
      margin: 0,
      padding: 0,
      boxSizing: 'inherit',
    },

    html: {
      fontSize: '62.5%',
      boxSizing: 'border-box',
    },

    body: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      lineHeight: theme.lineHeight,
    },
  }),
};

export default theme;
