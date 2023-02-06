import type { MouseEventHandler, ReactNode } from 'react';
import {
  Button,
  type ButtonProps,
  useMantineTheme,
  createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    transition: 'all .2s',

    '&:disabled': {
      backgroundColor: [theme.colors.gray[4]],
    },
  },
}));

type MyButtonProps = ButtonProps & {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const MyButton = ({
  className = '',
  onClick,
  children,
  color = '',
  ...rest
}: MyButtonProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const colorOverride =
    color === ''
      ? theme.colors[theme.primaryColor][Number(theme.primaryShade)]
      : color;

  return (
    <Button
      className={`${classes.button} ${className}`}
      onClick={onClick}
      color={colorOverride}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default MyButton;