import { Alert, type AlertProps } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

type MyAlertProps = AlertProps & {
  children: React.ReactNode;
};

const MyAlert = ({ children, ...rest }: MyAlertProps) => {
  return (
    <Alert
      icon={<IconAlertCircle />}
      color="red"
      variant="filled"
      withCloseButton
      closeButtonLabel="Close alert"
      {...rest}
    >
      {children}
    </Alert>
  );
};

export default MyAlert;
