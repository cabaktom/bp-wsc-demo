import React, { MouseEventHandler, ReactNode } from 'react';
import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
  createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: [theme.colors[theme.primaryColor][7]],
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
  ...rest
}: ButtonProps) => {
  const { classes } = useStyles();

  return (
    <MantineButton
      className={`${classes.button} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
