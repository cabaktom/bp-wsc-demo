import {
  Alert as MantineAlert,
  type AlertProps as MantineAlertProps,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

type AlertProps = MantineAlertProps & {
  children: React.ReactNode;
};

const Alert = ({ children, ...rest }: AlertProps) => {
  return (
    <MantineAlert
      icon={<IconAlertCircle />}
      color="red"
      variant="filled"
      withCloseButton
      closeButtonLabel="Close alert"
      {...rest}
    >
      {children}
    </MantineAlert>
  );
};

export default Alert;
