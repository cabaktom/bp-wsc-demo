import React from 'react';
import {
  PaperProps as MantinePaperProps,
  Paper as MantinePaper,
} from '@mantine/core';

type PaperProps = MantinePaperProps & {};

const Paper = ({ children, ...rest }: PaperProps) => {
  return (
    <MantinePaper shadow="xs" p="xl" radius="md" withBorder {...rest}>
      {children}
    </MantinePaper>
  );
};

export default Paper;
