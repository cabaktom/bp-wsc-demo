import { useContext, useState } from 'react';
import {
  Alert,
  Center,
  PasswordInput,
  TextInput,
  createStyles,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { IconAlertCircle, IconCheck } from '@tabler/icons';
import Button from '../Button/Button';
import AdminsContext from '../../context/admins-context';

const useStyles = createStyles(() => ({
  form: {
    width: '100%',
  },
  alert: {
    marginBottom: '1rem',
  },
  input: {
    marginBottom: '1.5rem',
  },
  button: {
    marginTop: '1rem',
  },
}));

const CreateAdminForm = () => {
  const ctx = useContext(AdminsContext);
  const { classes } = useStyles();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      await ctx.refreshAdmins();
    }
  };

  return (
    <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
      {error && (
        <Alert
          className={classes.alert}
          icon={<IconAlertCircle />}
          color="red"
          variant="filled"
          withCloseButton
          closeButtonLabel="Close alert"
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      <TextInput
        className={classes.input}
        withAsterisk
        label="Username"
        aria-label="Username input"
        {...form.getInputProps('username')}
      />

      <TextInput
        className={classes.input}
        withAsterisk
        label="Email"
        aria-label="Email input"
        {...form.getInputProps('email')}
      />

      <PasswordInput
        className={classes.input}
        withAsterisk
        label="Password"
        placeholder="******"
        aria-label="Password input"
        {...form.getInputProps('password')}
      />

      <PasswordInput
        className={classes.input}
        withAsterisk
        label="Confirm password"
        placeholder="******"
        aria-label="Confirm password input"
        {...form.getInputProps('confirmPassword')}
      />

      <Center>
        <Button
          className={classes.button}
          type="submit"
          fullWidth
          loading={loading}
          disabled={!form.isValid()}
        >
          Create
        </Button>
      </Center>
    </form>
  );
};

export default CreateAdminForm;
