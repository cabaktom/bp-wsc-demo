import { useState } from 'react';
import { useSWRConfig } from 'swr';
import {
  Checkbox,
  Flex,
  Grid,
  Group,
  Select,
  Stack,
  TextInput,
  Textarea,
  Title,
  createStyles,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import MyButton from '../Button/MyButton';
import MyAlert from './MyAlert';

const useStyles = createStyles((theme) => ({
  abstractColumn: {
    [theme.fn.largerThan('lg')]: {
      borderLeft: `thin dashed ${
        theme.colors[theme.primaryColor][Number(theme.primaryShade)]
      }`,
    },
  },
}));

type RegisterFormProps = {
  participantTitle: string;
  abstractTitle: string;
};

const RegisterForm = ({
  participantTitle,
  abstractTitle,
}: RegisterFormProps) => {
  const { classes } = useStyles();
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

      <Grid gutter="xl" justify="center">
        <Grid.Col xs={12} lg={form.values.contributing ? 6 : 12}>
          <Stack spacing="sm">
            <Title order={3} m="0 0 .2rem 0 !important">
              {participantTitle}
            </Title>

            <Flex direction={{ base: 'column', xs: 'row' }} gap="sm">
              <TextInput
                withAsterisk
                label="Full name"
                aria-label="Full name input"
                {...form.getInputProps('fullName')}
                w={{ base: '100%', sm: '50%' }}
              />
              <TextInput
                withAsterisk
                label="Email"
                aria-label="Email input"
                {...form.getInputProps('email')}
                w={{ base: '100%', sm: '50%' }}
              />
            </Flex>

            <Flex direction={{ base: 'column', xs: 'row' }} gap="sm">
              <TextInput
                withAsterisk
                label="Affiliation"
                aria-label="Affiliation input"
                {...form.getInputProps('affiliation')}
                w={{ base: '100%', xs: '75%' }}
              />
              <Select
                withAsterisk
                label="Participation"
                aria-label="Participation input"
                data={[
                  { value: 'ONLINE', label: 'Online' },
                  { value: 'ONSITE', label: 'Onsite' },
                ]}
                {...form.getInputProps('participation')}
                w={{ base: '100%', xs: '25%' }}
              />
            </Flex>

            <Textarea
              autosize
              minRows={2}
              maxRows={4}
              label="Mailing address (will be used for invoice)"
              aria-label="Mailing address (will be used for invoice) input"
              {...form.getInputProps('mailingAddress')}
            />

            <Textarea
              autosize
              minRows={2}
              maxRows={5}
              label="Additional message"
              aria-label="Additional message input"
              {...form.getInputProps('additionalMessage')}
            />

            <Group spacing="xl">
              <Checkbox
                label="Contribution"
                aria-label="Contribution checkbox"
                {...form.getInputProps('contributing', { type: 'checkbox' })}
              />
              <Checkbox
                label="Student"
                aria-label="Student checkbox"
                {...form.getInputProps('student', { type: 'checkbox' })}
              />
            </Group>
          </Stack>
        </Grid.Col>

        {form.values.contributing && (
          <Grid.Col className={classes.abstractColumn} xs={12} lg={6}>
            <Stack spacing="sm">
              <Title order={3} m="0 0 .2rem 0 !important">
                {abstractTitle}
              </Title>

              <TextInput
                withAsterisk
                label="Abstract title"
                aria-label="Abstract title input"
                {...form.getInputProps('title')}
              />

              <Flex direction={{ base: 'column', xs: 'row' }} gap="sm">
                <TextInput
                  label="Additional authors"
                  aria-label="Additional authors input"
                  {...form.getInputProps('additionalAuthors')}
                  w={{ base: '100%', sm: '50%' }}
                />
                <TextInput
                  label="Affiliation authors"
                  aria-label="Affiliation authors input"
                  {...form.getInputProps('affiliationAuthors')}
                  w={{ base: '100%', sm: '50%' }}
                />
              </Flex>

              <Textarea
                autosize
                minRows={2}
                maxRows={5}
                label="Abstract"
                aria-label="Abstract input"
                {...form.getInputProps('abstract')}
              />

              <Checkbox
                label="Poster"
                aria-label="Poster checkbox"
                {...form.getInputProps('poster', { type: 'checkbox' })}
              />

              {/* <FileInput
                  clearable
                  label="Upload poster"
                  aria-label="Upload poster input"
                  placeholder="poster.pdf"
                  icon={<IconUpload size={18} />}
                  {...form.getInputProps('poster')}
                  accept=".pdf,.jpg,.jpeg,.png"
                /> */}
            </Stack>
          </Grid.Col>
        )}

        <Grid.Col>
          <Flex justify="center">
            <MyButton
              type="submit"
              loading={loading}
              disabled={!form.isValid()}
            >
              Submit
            </MyButton>
          </Flex>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default RegisterForm;
