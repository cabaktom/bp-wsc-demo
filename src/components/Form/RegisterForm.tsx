import { useState } from 'react';
import { useSWRConfig } from 'swr';
import {
  Checkbox,
  Group,
  Select,
  Stack,
  TextInput,
  Textarea,
  Transition,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import MyButton from '../Button/MyButton';
import MyAlert from './MyAlert';

const RegisterForm = () => {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      affiliation: '',
      participation: 'ONSITE',
      mailingAddress: '',
      student: false,
      additionalMessage: '',
      contributing: true,
      title: '',
      poster: false,
      additionalAuthors: '',
      affiliationAuthors: '',
      abstract: '',
    },
    validate: {
      fullName: isNotEmpty('Full name is required.'),
      email: isEmail('Invalid email.'),
      affiliation: isNotEmpty('Affiliation is required.'),
      title: (value, values) =>
        values.contributing && value.length === 0
          ? 'Abstract title is required.'
          : null,
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(
        data.message ??
          'Error while submitting your registration, please try again.',
      );
    } else {
      setError('');
      form.reset();

      showNotification({
        title: 'Success!',
        message: 'You have been registered.',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });

      mutate('/api/participants');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {error && (
        <MyAlert onClose={() => setError('')} mb="xs">
          {error}
        </MyAlert>
      )}

      <Stack align="stretch">
        <Group grow>
          <TextInput
            withAsterisk
            label="Full name"
            aria-label="Full name input"
            {...form.getInputProps('fullName')}
          />
          <TextInput
            withAsterisk
            label="Email"
            aria-label="Email input"
            {...form.getInputProps('email')}
          />
        </Group>

        <Group grow>
          <TextInput
            withAsterisk
            label="Affiliation"
            aria-label="Affiliation input"
            {...form.getInputProps('affiliation')}
          />
          <Select
            withAsterisk
            label="Online/Onsite participation"
            aria-label="Online/Onsite participation input"
            data={[
              { value: 'ONLINE', label: 'Online' },
              { value: 'ONSITE', label: 'Onsite' },
            ]}
            {...form.getInputProps('participation')}
          />
        </Group>

        <Group grow>
          <TextInput
            label="Mailing address (will be used for invoice)"
            aria-label="Mailing address (will be used for invoice) input"
            {...form.getInputProps('mailingAddress')}
          />
          <Checkbox
            label="Student"
            aria-label="Student checkbox"
            {...form.getInputProps('student', { type: 'checkbox' })}
          />
        </Group>

        <Textarea
          autosize
          minRows={2}
          maxRows={5}
          label="Additional message"
          aria-label="Additional message input"
          {...form.getInputProps('additionalMessage')}
        />

        <Checkbox
          label="Contribution"
          aria-label="Contribution checkbox"
          {...form.getInputProps('contributing', { type: 'checkbox' })}
        />

        <Transition
          mounted={form.values.contributing}
          transition="scale-y"
          duration={100}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Group grow>
                <TextInput
                  withAsterisk
                  label="Abstract title"
                  aria-label="Abstract title input"
                  {...form.getInputProps('title')}
                />
                <Checkbox
                  label="Poster"
                  aria-label="Poster checkbox"
                  {...form.getInputProps('poster', { type: 'checkbox' })}
                />
              </Group>
              <Group grow>
                <TextInput
                  label="Additional authors"
                  aria-label="Additional authors input"
                  {...form.getInputProps('additionalAuthors')}
                />
                <TextInput
                  label="Affiliation authors"
                  aria-label="Affiliation authors input"
                  {...form.getInputProps('affiliationAuthors')}
                />
              </Group>

              <Textarea
                autosize
                minRows={2}
                maxRows={5}
                label="Abstract"
                aria-label="Abstract input"
                {...form.getInputProps('abstract')}
              />
            </div>
          )}
        </Transition>

        <MyButton type="submit" loading={loading} disabled={!form.isValid()}>
          Submit
        </MyButton>
      </Stack>
    </form>
  );
};

export default RegisterForm;
