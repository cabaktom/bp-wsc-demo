import { useState } from 'react';
import { Stack, Flex, PasswordInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';

import MyButton from '../Button/MyButton';
import MyAlert from './MyAlert';

type ChangePasswordFormProps = {
  id: number;
};

const ChangePasswordForm = ({ id }: ChangePasswordFormProps) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: isNotEmpty('Current password is required.'),
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
    currentPassword,
    password,
  }: typeof form.values) => {
    setLoading(true);
    const res = await fetch(`/api/admins/${id}/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword,
        newPassword: password,
      }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(
        data.message ?? 'Error while changing password, please try again.',
      );
    } else {
      setError('');
      form.reset();

      showNotification({
        title: 'Success!',
        message: 'Password changed.',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
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
        <PasswordInput
          withAsterisk
          label="Current password"
          placeholder="******"
          aria-label="Current password input"
          {...form.getInputProps('currentPassword')}
        />

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
          Update
        </MyButton>
      </Stack>
    </form>
  );
};

export default ChangePasswordForm;
