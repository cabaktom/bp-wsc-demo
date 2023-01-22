import { useContext, useState } from 'react';
import { Center, PasswordInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { IconCheck } from '@tabler/icons';
import Button from '../Button/Button';
import AdminsContext from '../../context/admins-context';
import Alert from './Alert';

type ChangePasswordFormProps = {
  id: number;
};

const ChangePasswordForm = ({ id }: ChangePasswordFormProps) => {
  const ctx = useContext(AdminsContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: isNotEmpty('Current password is required.'),
      password: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters.' : null,
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
      method: 'PUT',
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
      await ctx.refreshAdmins();
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {error && <Alert onClose={() => setError('')}>{error}</Alert>}

      <PasswordInput
        withAsterisk
        label="Current password"
        placeholder="******"
        aria-label="Current password input"
        mb="sm"
        {...form.getInputProps('currentPassword')}
      />

      <PasswordInput
        withAsterisk
        label="Password"
        placeholder="******"
        aria-label="Password input"
        mb="sm"
        {...form.getInputProps('password')}
      />

      <PasswordInput
        withAsterisk
        label="Confirm password"
        placeholder="******"
        aria-label="Confirm password input"
        mb="sm"
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
          Update
        </Button>
      </Center>
    </form>
  );
};

export default ChangePasswordForm;
