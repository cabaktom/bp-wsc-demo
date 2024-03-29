import type { MantineThemeOverride } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

/**
 * Mantine theme override. Sets color theme and default styles for components.
 *
 * @see https://mantine.dev/theming/theme-object/
 */
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
  primaryShade: 7,
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
      h3: { fontSize: 30, fontWeight: 'bold' },
      h4: { fontSize: 26, fontWeight: 'bold' },
      h5: { fontSize: 23, fontWeight: 'bold' },
      h6: { fontSize: 20, fontWeight: 'bold' },
    },
  },
  components: {
    TypographyStylesProvider: {
      styles: {
        root: {
          '& h3, & h4, & h5, & h6': {
            color: '#1976D2', // materialBlue.7
          },
          '& p': { marginBottom: '1rem' },
          '& ol li, & ul li': { margin: '0' },
          '& ol li p, & ul li p': { marginBottom: '.5rem' },
          '& div.mantine-Paper-root': {
            // titles in card have no margin
            '& h3, & h4, & h5, & h6': {
              margin: '0 0 1rem 0',
            },
          },
        },
      },
    },
    Alert: {
      defaultProps: {
        icon: <IconAlertCircle />,
        color: 'red',
        variant: 'filled',
        withCloseButton: true,
        closeButtonLabel: 'Close alert',
      },
    },
    Button: {
      defaultProps: (theme) => ({
        color: theme.colors[theme.primaryColor][Number(theme.primaryShade)],
      }),
      styles: (theme) => ({
        root: {
          transition: 'all .2s',

          '&:disabled': {
            backgroundColor: [theme.colors.gray[4]],
          },
        },
      }),
    },
    Burger: {
      defaultProps: {
        size: 'md',
        mr: 'md',
        color: 'white',
      },
      styles: (theme) => ({
        root: {
          marginLeft: 'auto',
          outline: 'none',
          [theme.fn.largerThan('sm')]: {
            display: 'none',
          },
        },
      }),
    },
    Paper: {
      defaultProps: {
        shadow: 'xs',
        p: 'xl',
        radius: 'sm',
        withBorder: true,
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
