import { useState } from 'react';
import {
  Text as MantineText,
  Stack as MantineStack,
  Group as MantineGroup,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ContextModalProps } from '@mantine/modals';
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconExclamationMark } from '@tabler/icons';

import Button from '../Button/Button';

type DeleteModalProps = ContextModalProps<{
  modalBody: string;
  subjectId: number;
  subjectTitle: string;
  actionUrl: string;
}>;

const DeleteModal = ({ context, id, innerProps }: DeleteModalProps) => {
  const matches = useMediaQuery('(min-width: 768px)', false, {
    getInitialValueInEffect: false,
  });
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`${innerProps.actionUrl}/${innerProps.subjectId}`, {
      method: 'DELETE',
    });
    setLoading(false);

    if (res.status === 204) {
      showNotification({
        title: 'Success!',
        message: `${innerProps.subjectTitle} deleted successfully.`,
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
    } else if (res.status === 404) {
      showNotification({
        title: 'Error!',
        message: `${innerProps.subjectTitle} not found.`,
        color: 'red',
        icon: <IconExclamationMark size={16} />,
        autoClose: 4000,
      });
    }

    context.closeModal(id);
  };

  return (
    <>
      <MantineStack>
        <MantineText size="md">{innerProps.modalBody}</MantineText>

        <MantineGroup position="right" spacing={matches ? 'md' : 'xs'} noWrap>
          <Button variant="outline" onClick={() => context.closeModal(id)}>
            Cancel
          </Button>
          <Button color="red" loading={loading} onClick={handleDelete}>
            Delete
          </Button>
        </MantineGroup>
      </MantineStack>
    </>
  );
};

export default DeleteModal;
