import React, { ReactNode } from 'react';
import { Container as MantineContainer, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  content: {
    padding: '2rem 3rem 0 3rem',
    [theme.fn.smallerThan('sm')]: {
      padding: '0 2rem',
    },
  },
}));

type ContentProps = {
  children: ReactNode;
};

const Content = ({ children }: ContentProps) => {
  const { classes } = useStyles();

  return (
    <MantineContainer className={classes.content} size="lg">
      {children}
    </MantineContainer>
  );
};

export default Content;
