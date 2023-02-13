import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { Flex, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';

import MyButton from '../Button/MyButton';
import MyAlert from './MyAlert';

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
      username: (value) => {
        const trimmedValue = value.trim();
        return trimmedValue.length < 1
          ? 'Username is required.'
          : trimmedValue.length > 255
          ? 'Username can be at most 255 characters long.'
          : null;
      },
      email: (value) => {
        const trimmedValue = value.trim();
        return trimmedValue.length < 1
          ? 'Email address is required.'
          : trimmedValue.length > 255
          ? 'Email address can be at most 255 characters long.'
          : !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,63})+$/.test(trimmedValue)
          ? 'Invalid email address.'
          : null;
      },
      password: (value) =>
        value.length < 6
          ? 'Password must be at least 6 characters long.'
          : null,
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
        <MyAlert onClose={() => setError('')} mb="xs">
          {error}
        </MyAlert>
      )}

      <Stack spacing="sm">
        <Flex
          direction={{ base: 'column', sm: 'row', md: 'column', lg: 'row' }}
          gap="sm"
        >
          <TextInput
            withAsterisk
            label="Username"
            aria-label="Username input"
            {...form.getInputProps('username')}
            w={{ base: '100%', sm: '50%', md: '100%', lg: '50%' }}
          />

          <TextInput
            withAsterisk
            label="Email"
            aria-label="Email input"
            {...form.getInputProps('email')}
            w={{ base: '100%', sm: '50%', md: '100%', lg: '50%' }}
          />
        </Flex>

        <Flex
          direction={{ base: 'column', sm: 'row', md: 'column', lg: 'row' }}
          gap="sm"
        >
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="******"
            aria-label="Password input"
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps('password')}
            w={{ base: '100%', sm: '50%', md: '100%', lg: '50%' }}
          />

          <PasswordInput
            withAsterisk
            label="Confirm password"
            placeholder="******"
            aria-label="Confirm password input"
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps('confirmPassword')}
            w={{ base: '100%', sm: '50%', md: '100%', lg: '50%' }}
          />
        </Flex>

        <MyButton
          type="submit"
          loading={loading}
          disabled={!form.isValid()}
          mt="xs"
          mx="auto"
          w={{ base: '100%', xs: '50%', md: '100%', lg: '50%' }}
        >
          Create
        </MyButton>
      </Stack>
    </form>
  );
};

export default CreateAdminForm;
