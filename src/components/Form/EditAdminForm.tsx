import { useContext, useState } from 'react';
import { Center, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { IconCheck } from '@tabler/icons';
import Button from '../Button/Button';
import AdminsContext from '../../context/admins-context';
import Alert from './Alert';

type EditAdminFormProps = {
  className?: string;
  id: number;
  username: string;
  email: string;
};

const EditAdminForm = ({
  className = '',
  id,
  username,
  email,
}: EditAdminFormProps) => {
  const ctx = useContext(AdminsContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username,
      email,
    },
    validate: {
      username: isNotEmpty('Username is required.'),
      email: isEmail('Invalid email.'),
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
      await ctx.refreshAdmins();
    }
  };

  return (
    <form className={className} onSubmit={form.onSubmit(handleSubmit)}>
      {error && (
        <Alert onClose={() => setError('')} withCloseButton={false}>
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

      <Center>
        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={!form.isValid()}
          mt="xs"
        >
          Save
        </Button>
      </Center>
    </form>
  );
};

export default EditAdminForm;