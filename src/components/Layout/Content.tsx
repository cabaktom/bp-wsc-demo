import React, { ReactNode } from 'react';
import { Container as MantineContainer, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  content: {
    marginTop: '2rem',
    padding: '0 3rem',
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
