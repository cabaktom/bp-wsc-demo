import { z } from 'zod';
import { Title as MantineTitle, createStyles } from '@mantine/core';

import Modal from './Modal';
import type { AdminOut } from '../../schemas/Admin';
import EditAdminForm from '../Form/EditAdminForm';

const useStyles = createStyles(() => ({
  form: {
    width: '100%',
  },
}));

type EditModalProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  data: z.infer<typeof AdminOut>;
};

const EditModal = ({ opened, setOpened, data }: EditModalProps) => {
  const { classes } = useStyles();

  return (
    <>
      <Modal size="auto" opened={opened} onClose={() => setOpened(false)}>
        <MantineTitle align="center" order={5}>
          Edit administrator {data.username} (ID: {data.id})
        </MantineTitle>

        <EditAdminForm className={classes.form} {...data} />
      </Modal>
    </>
  );
};

export default EditModal;
