import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { Alert, Button, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { closeModal } from '@mantine/modals';
import { IconCheck } from '@tabler/icons-react';

import { AdminEdit } from '../../schemas/Admin';

type EditAdminFormProps = {
  id: string;
  username: string;
  email: string;
};

const EditAdminForm = ({ id, username, email }: EditAdminFormProps) => {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username,
      email,
    },
    validate: zodResolver(AdminEdit),
    validateInputOnChange: true,
  });

  const handleSubmit = async ({ username, email }: typeof form.values) => {
    setLoading(true);
    const res = await fetch(`/api/admins/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
      }),
    });
    setLoading(false);

    const data = await res.json();
    if (!res.ok) {
      setError(
        data.message ?? 'Error while editing administrator, please try again.',
      );
    } else {
      setError('');
      showNotification({
        title: 'Success!',
        message: `Changes to administrator ${data.username} saved.`,
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      mutate('/api/admins');
      closeModal('edit');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {error && (
        <Alert onClose={() => setError('')} withCloseButton={false} mb="xs">
          {error}
        </Alert>
      )}

      <Stack spacing="sm">
        <TextInput
          withAsterisk
          label="Username"
          aria-label="Username input"
          {...form.getInputProps('username')}
        />

        <TextInput
          withAsterisk
          label="Email"
          aria-label="Email input"
          {...form.getInputProps('email')}
        />

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={!form.isValid()}
          mt="xs"
        >
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default EditAdminForm;
