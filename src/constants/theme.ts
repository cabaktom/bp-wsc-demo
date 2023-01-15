import type { MantineThemeOverride } from '@mantine/core';

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
    materialOrange: [
      '#fff3e0',
      '#ffe0b2',
      '#ffcc80',
      '#ffb74d',
      '#ffa726',
      '#ff9800',
      '#fb8c00',
      '#f57c00',
      '#ef6c00',
      '#e65100',
    ],
  },
  primaryColor: 'materialBlue',
  primaryShade: 9,
  cursorType: 'pointer',
  defaultRadius: 'sm',
  loader: 'oval',
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
  },
  headings: {
    sizes: {
      h1: { fontSize: 32, fontWeight: 'normal' },
      h2: { fontSize: 18, fontWeight: 'bold' },
      h3: { fontSize: 32, fontWeight: 'bold' },
      h4: { fontSize: 26, fontWeight: 'bold' },
      h5: { fontSize: 23, fontWeight: 'bold' },
      h6: { fontSize: 20, fontWeight: 'bold' },
    },
  },
  components: {
    TypographyStylesProvider: {
      styles: {
        root: {
          '& h3, & h4, & h5, & h6': { color: '#fb8c00' }, // materialOrange.6
          '& p': { marginBottom: '1rem' },
          '& ol li, & ul li': { margin: '0' },
          '& ol li p, & ul li p': { marginBottom: '.5rem' },
        },
      },
    },
  },

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
