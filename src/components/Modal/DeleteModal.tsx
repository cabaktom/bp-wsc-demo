import { useContext, useState } from 'react';
import { Group as MantineGroup, Title as MantineTitle } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons';

import Button from '../Button/Button';
import Modal from './Modal';
import AdminsContext from '../../context/admins-context';

type DeleteModalProps = {
  opened: {
    value: boolean;
    id: number;
    itemTitle: string;
    itemIdentifier: string;
  };
  setOpened: (opened: {
    value: boolean;
    id: number;
    itemTitle: string;
    itemIdentifier: string;
  }) => void;
};

const DeleteModal = ({ opened, setOpened }: DeleteModalProps) => {
  const ctx = useContext(AdminsContext);
  const [loading, setLoading] = useState(false);

  const handleClose = (val: boolean) => {
    setOpened({
      value: val,
      id: opened.id,
      itemTitle: opened.itemTitle,
      itemIdentifier: opened.itemIdentifier,
    });
  };

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/admins/${opened.id}`, {
      method: 'DELETE',
    });
    setLoading(false);
    handleClose(false);

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
      <Modal opened={opened.value} setOpened={handleClose}>
        <MantineTitle align="center" order={5}>
          Are you sure you want to delete {opened.itemTitle}{' '}
          {opened.itemIdentifier} (ID: {opened.id})?
        </MantineTitle>

        <MantineGroup spacing="sm">
          <Button onClick={handleDelete} loading={loading}>
            Delete
          </Button>
          <Button onClick={() => handleClose(false)} color="red">
            Cancel
          </Button>
        </MantineGroup>
      </Modal>
    </>
  );
};

export default DeleteModal;
