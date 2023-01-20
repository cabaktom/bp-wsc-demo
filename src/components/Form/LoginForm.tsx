import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import {
  Text,
  Alert,
  Center,
  Group,
  PasswordInput,
  TextInput,
  createStyles,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons';

import Button from '../Button/Button';

const useStyles = createStyles((theme) => ({
  form: {
    width: '100%',
    fontSize: '1.6rem',
  },
  alert: {
    marginBottom: '1rem',
  },
  input: {
    marginBottom: '1.5rem',
  },
  forgotPasswordLabel: {
    paddingTop: 2,
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
    fontWeight: 500,
    fontSize: theme.fontSizes.xs,
  },
  button: {
    marginTop: '1rem',
  },
}));

const LoginForm = () => {
  const router = useRouter();
  const { classes } = useStyles();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty('Enter your username'),
      password: isNotEmpty('Enter your password'),
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = async ({ username, password }: typeof form.values) => {
    setLoading(true);
    const data = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });
    setLoading(false);

    if (data?.error) {
      setError(data.error ?? 'Error while logging in, please try again.');
    } else {
      setError('');
      router.replace((router.query.callbackUrl as string) ?? '/admin');
    }
  };

  return (
    <>
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

        <input name="csrfToken" type="hidden" />

        <TextInput
          className={classes.input}
          size="md"
          withAsterisk
          label="Username"
          aria-label="Username input"
          {...form.getInputProps('username')}
        />
        <Group position="apart" mb={5}>
          <Text component="label" htmlFor="password" size="md" weight={500}>
            Password *
          </Text>

          <Link className={classes.forgotPasswordLabel} href="/logout">
            Forgot your password?
          </Link>
        </Group>
        <PasswordInput
          className={classes.input}
          size="md"
          withAsterisk
          id="password"
          placeholder="******"
          aria-label="Password input"
          {...form.getInputProps('password')}
        />
        <Center>
          <Button
            className={classes.button}
            type="submit"
            fullWidth
            loading={loading}
          >
            Sign in
          </Button>
        </Center>
      </form>
    </>
  );
};

export default LoginForm;
