import { Modal as MantineModal, Stack as MantineStack } from '@mantine/core';

type ModalProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  children: React.ReactNode;
};

const Modal = ({ opened, setOpened, children }: ModalProps) => {
  return (
    <>
      <MantineModal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        size="xs"
        closeButtonLabel="Close modal"
        overlayOpacity={0.4}
        overlayBlur={2}
        transitionDuration={200}
        exitTransitionDuration={100}
      >
        <MantineStack align="center" spacing="xl">
          {children}
        </MantineStack>
      </MantineModal>
    </>
  );
};

export default Modal;
