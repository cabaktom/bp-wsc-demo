import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    materialBlue: [
      '#E3F2FD',
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3',
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1',
    ],
  },
  primaryColor: 'materialBlue',
  primaryShade: 9,
  cursorType: 'pointer',
  defaultRadius: 'sm',
  loader: 'oval',

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
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.colors.dark[7],
      lineHeight: theme.lineHeight,
    },
  }),
};

export default theme;
