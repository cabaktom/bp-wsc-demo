import { useState } from 'react';
import { useSWRConfig } from 'swr';
import {
  Alert,
  Button,
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
import { isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCircleCheck, IconAlertCircle } from '@tabler/icons-react';

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
  withInvited?: boolean;
  inFormFeedback?: boolean;
};

const RegisterForm = ({
  participantTitle,
  abstractTitle,
  withInvited = false,
  inFormFeedback = false,
}: RegisterFormProps) => {
  const { classes } = useStyles();
  const { mutate } = useSWRConfig();
  const [feedback, setFeedback] = useState<{
    message: string;
    icon: React.ReactNode;
    color: string;
  } | null>();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      participant: {
        fullName: '',
        email: '',
        affiliation: '',
        participation: 'ONSITE',
        mailingAddress: '',
        student: false,
        additionalMessage: '',
        poster: false,
        invited: false,
      },
      abstract: {
        title: '',
        additionalAuthors: '',
        affiliationAuthors: '',
        abstract: '',
      },
      contributing: true,
    },
    validate: {
      participant: {
        fullName: (value) => {
          const trimmedValue = value.trim();
          return trimmedValue.length < 1
            ? 'Full name is required.'
            : trimmedValue.length > 255
            ? 'Full name can be at most 255 characters long.'
            : null;
        },
        email: (value) => {
          const trimmedValue = value.trim();
          return trimmedValue.length < 1
            ? 'Email address is required.'
            : trimmedValue.length > 255
            ? 'Email address can be at most 255 characters long.'
            : !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,63})+$/.test(trimmedValue)
            ? 'Invalid email address.'
            : null;
        },
        affiliation: isNotEmpty('Affiliation is required.'),
      },
      abstract: {
        title: (value, values) => {
          const trimmedValue = value.trim();
          return values.contributing && trimmedValue.length === 0
            ? 'Abstract title is required.'
            : trimmedValue.length > 255
            ? 'Abstract title can be at most 255 characters long.'
            : null;
        },
      },
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
      body: JSON.stringify({
        ...values.participant,
        ...values.abstract,
        contributing: values.contributing,
      }),
    });
    setLoading(false);

    const data = await res.json();

    if (!res.ok) {
      const result = {
        title: 'Error!',
        message:
          data.message ??
          'Error while submitting your registration, please try again.',
        color: 'red',
        icon: <IconAlertCircle size={20} />,
      };

      if (inFormFeedback) {
        setFeedback(result);
      } else {
        showNotification(result);
      }
    } else {
      const result = {
        title: 'Success!',
        message: `Registration was accepted. ${
          inFormFeedback ? 'You' : `Participant ${data.fullName}`
        } will receive a confirmation email shortly.`,
        color: 'green',
        icon: <IconCircleCheck size={20} />,
      };

      if (inFormFeedback) {
        setFeedback(result);
      } else {
        showNotification(result);
      }

      form.reset();
      mutate('/api/participants');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {feedback && (
        <Alert
          onClose={() => setFeedback(null)}
          mb="xs"
          icon={feedback.icon}
          color={feedback.color}
        >
          {feedback.message}
        </Alert>
      )}

      <Grid gutter="xl" justify="center">
        <Grid.Col xs={12} lg={form.values.contributing ? 6 : 12}>
          <Stack spacing="sm">
            <Title order={3}>{participantTitle}</Title>

            <Flex direction={{ base: 'column', xs: 'row' }} gap="sm">
              <TextInput
                withAsterisk
                label="Full name"
                aria-label="Full name input"
                {...form.getInputProps('participant.fullName')}
                w={{ base: '100%', sm: '50%' }}
              />
              <TextInput
                withAsterisk
                label="Email"
                aria-label="Email input"
                {...form.getInputProps('participant.email')}
                w={{ base: '100%', sm: '50%' }}
              />
            </Flex>

            <Flex direction={{ base: 'column', xs: 'row' }} gap="sm">
              <TextInput
                withAsterisk
                label="Affiliation"
                aria-label="Affiliation input"
                {...form.getInputProps('participant.affiliation')}
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
                {...form.getInputProps('participant.participation')}
                w={{ base: '100%', xs: '25%' }}
              />
            </Flex>

            <Textarea
              autosize
              minRows={2}
              maxRows={4}
              label="Mailing address (will be used for invoice)"
              aria-label="Mailing address (will be used for invoice) input"
              {...form.getInputProps('participant.mailingAddress')}
            />

            <Textarea
              autosize
              minRows={2}
              maxRows={5}
              label="Additional message"
              aria-label="Additional message input"
              {...form.getInputProps('participant.additionalMessage')}
            />

            <Group spacing="xl">
              <Checkbox
                label="Contribution"
                aria-label="Contribution checkbox"
                {...form.getInputProps('contributing', { type: 'checkbox' })}
              />
              <Checkbox
                label="Poster"
                aria-label="Poster checkbox"
                {...form.getInputProps('participant.poster', {
                  type: 'checkbox',
                })}
              />
              <Checkbox
                label="Student"
                aria-label="Student checkbox"
                {...form.getInputProps('participant.student', {
                  type: 'checkbox',
                })}
              />
              {withInvited && (
                <Checkbox
                  label="Invited"
                  aria-label="Invited checkbox"
                  {...form.getInputProps('participant.invited', {
                    type: 'checkbox',
                  })}
                />
              )}
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
                {...form.getInputProps('abstract.title')}
              />

              <Flex direction={{ base: 'column', xs: 'row' }} gap="sm">
                <TextInput
                  label="Additional authors"
                  aria-label="Additional authors input"
                  {...form.getInputProps('abstract.additionalAuthors')}
                  w={{ base: '100%', sm: '50%' }}
                />
                <TextInput
                  label="Affiliation authors"
                  aria-label="Affiliation authors input"
                  {...form.getInputProps('abstract.affiliationAuthors')}
                  w={{ base: '100%', sm: '50%' }}
                />
              </Flex>

              <Textarea
                autosize
                minRows={2}
                maxRows={5}
                label="Abstract"
                aria-label="Abstract input"
                {...form.getInputProps('abstract.abstract')}
              />
            </Stack>
          </Grid.Col>
        )}

        <Grid.Col>
          <Flex justify="center">
            <Button
              type="submit"
              loading={loading}
              disabled={!form.isValid()}
              mx="auto"
              w={{ base: '100%', xs: '70%', md: '60%', lg: '50%' }}
            >
              Submit
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default RegisterForm;
