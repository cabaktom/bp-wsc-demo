import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Alert, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { v4 as uuidv4 } from 'uuid';

const LandingForm = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm();

  const handleSubmit = async () => {
    setLoading(true);
    const data = await signIn('credentials', {
      redirect: false,
      username: `DEMO_${uuidv4()}`,
      password: uuidv4(),
    });
    setLoading(false);

    if (data?.error) {
      setError(data.error ?? 'Error while logging in, please try again.');
    } else {
      setError('');
      if (data?.url) {
        router.push(new URL(data.url).searchParams.get('callbackUrl') ?? '/');
      } else {
        router.push('/');
      }
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

        <Button type="submit" loading={loading} mt="sm" size="md">
          Start demo
        </Button>
      </form>
    </>
  );
};

export default LandingForm;
