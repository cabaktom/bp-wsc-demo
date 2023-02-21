import type { ReactNode } from 'react';
import { Container, type ContainerProps, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  content: {
    padding: '2rem 3rem 0 3rem',
    [theme.fn.smallerThan('sm')]: {
      padding: '0 2rem',
    },
  },
}));

type ContentProps = ContainerProps & {
  children: ReactNode;
};

const Content = ({ children, ...rest }: ContentProps) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.content} {...rest}>
      {children}
    </Container>
  );
};

export default Content;
