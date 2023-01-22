import {
  Paper as MantinePaper,
  type PaperProps as MantinePaperProps,
} from '@mantine/core';

type PaperProps = MantinePaperProps & {};

const Paper = ({ children, ...rest }: PaperProps) => {
  return (
    <MantinePaper shadow="xs" p="xl" radius="sm" withBorder h="100%" {...rest}>
      {children}
    </MantinePaper>
  );
};

export default Paper;
