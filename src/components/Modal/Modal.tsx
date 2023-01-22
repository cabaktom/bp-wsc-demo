import {
  ModalProps as MantineModalProps,
  Modal as MantineModal,
  Stack as MantineStack,
} from '@mantine/core';

type ModalProps = MantineModalProps & {
  children: React.ReactNode;
};

const Modal = ({ children, ...rest }: ModalProps) => {
  return (
    <>
      <MantineModal
        centered
        size="xs"
        closeButtonLabel="Close modal"
        overlayOpacity={0.4}
        overlayBlur={2}
        transitionDuration={200}
        exitTransitionDuration={100}
        {...rest}
      >
        <MantineStack align="center" spacing="xl">
          {children}
        </MantineStack>
      </MantineModal>
    </>
  );
};

export default Modal;
