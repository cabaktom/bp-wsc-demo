import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { PasswordInput, TextInput, Stack, Alert, Button } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty('Enter your username.'),
      password: (value) => (value.length < 1 ? 'Enter your password.' : null),
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
      router.push('/admin');
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {error && (
          <Alert onClose={() => setError('')} mb="xs">
            {error}
          </Alert>
        )}

        <input name="csrfToken" type="hidden" />

        <Stack spacing="sm">
          <TextInput
            withAsterisk
            label="Username"
            aria-label="Username input"
            {...form.getInputProps('username')}
          />

          <PasswordInput
            withAsterisk
            id="password"
            placeholder="******"
            label="Password"
            aria-label="Password input"
            {...form.getInputProps('password')}
          />

          <Button type="submit" fullWidth loading={loading} mt="xs">
            Sign in
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;
