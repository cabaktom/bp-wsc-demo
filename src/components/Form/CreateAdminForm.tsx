import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { Center, PasswordInput, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

import { IconCheck } from '@tabler/icons';
import Button from '../Button/Button';
import Alert from './Alert';

const CreateAdminForm = () => {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: isNotEmpty('Username is required.'),
      email: isEmail('Invalid email.'),
      password: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters.' : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match.' : null,
    },
    validateInputOnChange: true,
  });

  const handleSubmit = async ({
    username,
    password,
    email,
  }: typeof form.values) => {
    setLoading(true);
    const res = await fetch('/api/admins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(
        data.message ??
          'Error while creating new administrator, please try again.',
      );
    } else {
      setError('');
      form.reset();

      showNotification({
        title: 'Success!',
        message: 'Administrator created.',
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
        <Alert onClose={() => setError('')} mb="xs">
          {error}
        </Alert>
      )}

      <TextInput
        withAsterisk
        label="Username"
        aria-label="Username input"
        mb="sm"
        {...form.getInputProps('username')}
      />

      <TextInput
        withAsterisk
        label="Email"
        aria-label="Email input"
        mb="sm"
        {...form.getInputProps('email')}
      />

      <PasswordInput
        withAsterisk
        label="Password"
        placeholder="******"
        aria-label="Password input"
        mb="sm"
        visible={visible}
        onVisibilityChange={toggle}
        {...form.getInputProps('password')}
      />

      <PasswordInput
        withAsterisk
        label="Confirm password"
        placeholder="******"
        aria-label="Confirm password input"
        mb="sm"
        visible={visible}
        onVisibilityChange={toggle}
        {...form.getInputProps('confirmPassword')}
      />

      <Center>
        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={!form.isValid()}
          mt="xs"
        >
          Create
        </Button>
      </Center>
    </form>
  );
};

export default CreateAdminForm;
