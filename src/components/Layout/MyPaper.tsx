import { Paper, type PaperProps } from '@mantine/core';

type MyPaperProps = PaperProps;

const MyPaper = ({ children, ...rest }: MyPaperProps) => {
  return (
    <Paper shadow="xs" p="xl" radius="sm" withBorder {...rest}>
      {children}
    </Paper>
  );
};

export default MyPaper;
