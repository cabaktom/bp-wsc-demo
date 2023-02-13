import { useState } from 'react';
import { useSWRConfig } from 'swr';
import {
  Checkbox,
  Group,
  Stack,
  TextInput,
  Textarea,
  Text,
  Select,
  Flex,
  Grid,
  createStyles,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconTrash } from '@tabler/icons-react';
import { openContextModal } from '@mantine/modals';
import type { Abstract, Participant } from '@prisma/client';

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

type ParticipantFormProps = {
  participant: Participant & {
    abstract?: Abstract;
  };
};

const ParticipantForm = ({
  participant: {
    id: participantId,
    fullName,
    email,
    affiliation,
    participation,
    mailingAddress = '',
    student = false,
    additionalMessage = '',
    abstract,
  },
}: ParticipantFormProps) => {
  const { classes } = useStyles();
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      participant: {
        fullName,
        email,
        affiliation,
        participation,
        mailingAddress,
        student,
        additionalMessage,
      },
      abstract: {
        title: abstract?.title ?? '',
        poster: abstract?.poster ?? false,
        additionalAuthors: abstract?.additionalAuthors ?? '',
        affiliationAuthors: abstract?.affiliationAuthors ?? '',
        abstract: abstract?.abstract ?? '',
      },
      contributing: !!abstract,
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
        title: (value, values) =>
          values.contributing && value.length === 0
            ? 'Abstract title is required.'
            : value.length > 255
            ? 'Abstract title can be at most 255 characters long.'
            : null,
      },
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    // save participant
    const resParticipant = await fetch(`/api/participants/${participantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values.participant),
    });

    if (!resParticipant.ok) {
      const data = await resParticipant.json();
      showNotification({
        title: 'Error!',
        message:
          data.message ?? 'Error while saving participant, please try again.',
        color: 'red',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });

      setLoading(false);
      return;
    }

    if (values.contributing) {
      // save/create abstract
      const res = await fetch(`/api/abstracts/${abstract?.id ?? ''}`, {
        method: abstract ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values.abstract, participantId }),
      });

      if (!res.ok) {
        const data = await res.json();
        showNotification({
          title: 'Error!',
          message:
            data.message ?? 'Error while saving abstract, please try again.',
          color: 'red',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      }
    } else if (abstract) {
      // user had abstract but now will not contribute
      const res = await fetch(`/api/abstracts/${abstract.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        showNotification({
          title: 'Error!',
          message:
            data.message ?? 'Error while deleting abstract, please try again.',
          color: 'red',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      } else {
        // reset abstract part of form
        form.setFieldValue('abstract', {
          title: '',
          poster: false,
          additionalAuthors: '',
          affiliationAuthors: '',
          abstract: '',
        });
      }
    }

    setLoading(false);

    // update participants and abstracts
    mutate('/api/participants');
    mutate('/api/abstracts');

    showNotification({
      title: 'Success!',
      message: 'Changes saved successfully.',
      color: 'green',
      icon: <IconCheck size={16} />,
      autoClose: 4000,
    });
  };

  const handleDelete = async () => {
    openContextModal({
      modal: 'delete',
      title: 'Delete participant',
      size: 'md',
      innerProps: {
        modalBody: (
          <Text size="sm">
            Are you sure you want to delete participant{' '}
            <strong>{fullName}</strong>
            {abstract ? ` and abstract '${abstract.title}'` : ''}? This action
            cannot be undone.
          </Text>
        ),
        subjectId: participantId,
        subjectTitle: `Participant ${fullName}${
          abstract ? ` and abstract ${abstract.title}` : ''
        }`,
        actionUrl: '/api/participants',
      },
      onClose: () => mutate('/api/participants'),
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex
        direction={{ base: 'column', xs: 'row' }}
        mb="sm"
        gap="sm"
        justify="flex-end"
        align={{ base: 'flex-end', xs: 'center' }}
      >
        {!form.values.contributing && abstract && (
          <MyAlert withCloseButton={false}>
            Participant has an abstract, saving will delete it.
          </MyAlert>
        )}

        <Group spacing="sm" noWrap>
          <MyButton
            type="submit"
            loading={loading}
            disabled={!form.isValid()}
            leftIcon={<IconDeviceFloppy size={18} />}
          >
            Save
          </MyButton>

          <MyButton
            color="red.7"
            onClick={handleDelete}
            leftIcon={<IconTrash size={18} />}
          >
            Delete
          </MyButton>
        </Group>
      </Flex>

      <Grid gutter="xl" justify="center" pb="sm">
        <Grid.Col xs={12} lg={form.values.contributing ? 6 : 12}>
          <Stack spacing="sm">
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
                label="Student"
                aria-label="Student checkbox"
                {...form.getInputProps('participant.student', {
                  type: 'checkbox',
                })}
              />
            </Group>
          </Stack>
        </Grid.Col>

        {form.values.contributing && (
          <Grid.Col className={classes.abstractColumn} xs={12} lg={6}>
            <Stack spacing="sm">
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

              <Checkbox
                label="Poster"
                aria-label="Poster checkbox"
                {...form.getInputProps('abstract.poster', { type: 'checkbox' })}
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
      </Grid>
    </form>
  );
};

export default ParticipantForm;
