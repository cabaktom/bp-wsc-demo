import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import MyButton from '../Button/MyButton';
import MyAlert from './MyAlert';

type EditAdminFormProps = {
  id: number;
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
    validate: {
      username: (value) =>
        value.length < 1
          ? 'Username is required.'
          : value.length > 255
          ? 'Username can be at most 255 characters long.'
          : null,
      email: (value) =>
        value.length < 1
          ? 'Email address is required.'
          : value.length > 255
          ? 'Email address can be at most 255 characters long.'
          : !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,63})+$/)
          ? 'Invalid email address.'
          : null,
    },
    validateInputOnChange: true,
  });

  const handleSubmit = async ({ username, email }: typeof form.values) => {
    setLoading(true);
    const res = await fetch(`/api/admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
      }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(
        data.message ?? 'Error while editing administrator, please try again.',
      );
    } else {
      setError('');
      showNotification({
        title: 'Success!',
        message: 'Administrator changes saved.',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });

      mutate('/api/admins');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {error && (
        <MyAlert onClose={() => setError('')} withCloseButton={false} mb="xs">
          {error}
        </MyAlert>
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

        <MyButton
          type="submit"
          fullWidth
          loading={loading}
          disabled={!form.isValid()}
          mt="xs"
        >
          Save
        </MyButton>
      </Stack>
    </form>
  );
};

export default EditAdminForm;
