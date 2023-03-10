import { type MantineColor, createStyles } from '@mantine/core';

export default createStyles(
  (
    theme,
    { backgroundColor = 'gray' }: { backgroundColor?: MantineColor },
  ) => ({
    item: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: theme.radius.md,
      border: `thin solid ${theme.colors[backgroundColor][3]}`,
      padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
      paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`,
      backgroundColor: theme.colors[backgroundColor][0],
      marginBottom: theme.spacing.sm,
    },

    itemDragging: {
      boxShadow: theme.shadows.sm,
    },

    symbol: {
      fontSize: '3rem',
      fontWeight: 700,
      width: '6rem',
    },

    dragHandle: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: theme.colors.gray[6],
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
    },
  }),
);
