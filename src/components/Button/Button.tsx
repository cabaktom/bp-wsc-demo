import type { MouseEventHandler, ReactNode } from 'react';
import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
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

type ButtonProps = MantineButtonProps & {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const Button = ({
  className = '',
  onClick,
  children,
  color = '',
  ...rest
}: ButtonProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const colorOverride =
    color === ''
      ? theme.colors[theme.primaryColor][Number(theme.primaryShade)]
      : color;

  return (
    <MantineButton
      className={`${classes.button} ${className}`}
      onClick={onClick}
      color={colorOverride}
      {...rest}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
