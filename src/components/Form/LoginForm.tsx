import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import {
  Text,
  Center,
  Group,
  PasswordInput,
  TextInput,
  createStyles,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

import Button from '../Button/Button';
import Alert from './Alert';

const useStyles = createStyles((theme) => ({
  forgotPasswordLabel: {
    paddingTop: 2,
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
    fontWeight: 500,
    fontSize: theme.fontSizes.xs,
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
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {error && <Alert onClose={() => setError('')}>{error}</Alert>}

        <input name="csrfToken" type="hidden" />

        <TextInput
          withAsterisk
          label="Username"
          aria-label="Username input"
          mb="sm"
          {...form.getInputProps('username')}
        />
        <Group position="apart">
          <Text component="label" htmlFor="password" size="sm" weight={500}>
            Password *
          </Text>

          <Link
            className={classes.forgotPasswordLabel}
            href="/logout"
            title="Forgot password"
            aria-label="Forgot password"
          >
            Forgot your password?
          </Link>
        </Group>
        <PasswordInput
          withAsterisk
          id="password"
          placeholder="******"
          aria-label="Password input"
          mb="sm"
          {...form.getInputProps('password')}
        />
        <Center>
          <Button type="submit" fullWidth loading={loading} mt="xs">
            Sign in
          </Button>
        </Center>
      </form>
    </>
  );
};

export default LoginForm;
