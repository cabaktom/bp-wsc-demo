import { useState } from 'react';
import { Text, Stack, Group, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ContextModalProps } from '@mantine/modals';
import { IconCheck, IconExclamationMark } from '@tabler/icons-react';

type DeleteModalProps = ContextModalProps<{
  modalBody: string;
  subjectId: number;
  subjectTitle: string;
  actionUrl: string;
}>;

const DeleteModal = ({ context, id, innerProps }: DeleteModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(
      `${innerProps.actionUrl}${
        innerProps.subjectId ? `/${innerProps.subjectId}` : ''
      }`,
      {
        method: 'DELETE',
      },
    );
    setLoading(false);

    if (res.status === 204) {
      showNotification({
        title: 'Success!',
        message: `${innerProps.subjectTitle} deleted successfully.`,
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
    } else {
      showNotification({
        title: 'Error!',
        message: (await res.json()).message,
        color: 'red',
        icon: <IconExclamationMark size={16} />,
        autoClose: 4000,
      });
    }

    context.closeModal(id);
  };

  return (
    <>
      <Stack>
        <Text size="md">{innerProps.modalBody}</Text>

        <Group position="right" spacing="xs" noWrap>
          <Button variant="outline" onClick={() => context.closeModal(id)}>
            Cancel
          </Button>
          <Button color="red" loading={loading} onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default DeleteModal;
