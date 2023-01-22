import { useContext, useState } from 'react';
import { Title as MantineTitle } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons';
import { z } from 'zod';

import Button from '../Button/Button';
import Modal from './Modal';
import AdminsContext from '../../context/admins-context';
import type { AdminOut } from '../../schemas/Admin';

type DeleteModalProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  data: z.infer<typeof AdminOut>;
};

const DeleteModal = ({ opened, setOpened, data }: DeleteModalProps) => {
  const ctx = useContext(AdminsContext);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/admins/${data?.id}`, {
      method: 'DELETE',
    });
    setLoading(false);
    setOpened(false);

    if (res.status === 204) {
      showNotification({
        title: 'Success!',
        message: 'Administrator deleted.',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
    } else if (res.status === 404) {
      showNotification({
        title: 'Error!',
        message: 'Administrator not found.',
        color: 'red',
        icon: <IconExclamationMark size={16} />,
        autoClose: 4000,
      });
    }

    await ctx.refreshAdmins();
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <MantineTitle align="center" order={5}>
          Are you sure you want to delete administrator {data.username} (ID:{' '}
          {data.id})?
        </MantineTitle>

        <Button onClick={handleDelete} loading={loading} color="red">
          Delete
        </Button>
      </Modal>
    </>
  );
};

export default DeleteModal;
