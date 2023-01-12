import React, { MouseEventHandler, ReactNode } from 'react';
import { Button as MantineButton, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: [theme.colors[theme.primaryColor][7]],
  },
}));

type ButtonProps = {
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const Button = ({ className = '', onClick, children }: ButtonProps) => {
  const { classes } = useStyles();

  return (
    <MantineButton
      className={`${classes.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
