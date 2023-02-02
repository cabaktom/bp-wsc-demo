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
  Transition,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconTrash } from '@tabler/icons';
import { openContextModal } from '@mantine/modals';
import type { Abstract, Participant } from '@prisma/client';

import Button from '../Button/Button';
import Alert from './Alert';

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
        fullName: isNotEmpty('Full name is required.'),
        email: isEmail('Invalid email.'),
        affiliation: isNotEmpty('Affiliation is required.'),
      },
      abstract: {
        title: (value, values) =>
          values.contributing && value.length === 0
            ? 'Abstract title is required.'
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
      <Flex mb="sm" gap="sm" justify="flex-end" align="center">
        {!form.values.contributing && abstract && (
          <Alert withCloseButton={false}>
            Participant has an abstract, saving will delete it.
          </Alert>
        )}
        <Button
          type="submit"
          loading={loading}
          disabled={!form.isValid()}
          leftIcon={<IconDeviceFloppy size={18} />}
        >
          Save
        </Button>

        <Button
          color="red.7"
          onClick={handleDelete}
          leftIcon={<IconTrash size={18} />}
        >
          Delete
        </Button>
      </Flex>

      <Stack align="stretch" spacing="xl">
        <Stack>
          <Group grow>
            <TextInput
              withAsterisk
              label="Full name"
              aria-label="Full name input"
              {...form.getInputProps('participant.fullName')}
            />
            <TextInput
              withAsterisk
              label="Email"
              aria-label="Email input"
              {...form.getInputProps('participant.email')}
            />
          </Group>

          <Group grow>
            <TextInput
              withAsterisk
              label="Affiliation"
              aria-label="Affiliation input"
              {...form.getInputProps('participant.affiliation')}
            />
            <Select
              withAsterisk
              label="Online/Onsite participation"
              aria-label="Online/Onsite participation input"
              data={[
                { value: 'ONLINE', label: 'Online' },
                { value: 'ONSITE', label: 'Onsite' },
              ]}
              {...form.getInputProps('participant.participation')}
            />
          </Group>

          <Group grow>
            <TextInput
              label="Mailing address (will be used for invoice)"
              aria-label="Mailing address (will be used for invoice) input"
              {...form.getInputProps('participant.mailingAddress')}
            />
            <Checkbox
              label="Student"
              aria-label="Student checkbox"
              {...form.getInputProps('participant.student', {
                type: 'checkbox',
              })}
            />
          </Group>

          <Textarea
            autosize
            minRows={2}
            maxRows={5}
            label="Additional message"
            aria-label="Additional message input"
            {...form.getInputProps('participant.additionalMessage')}
          />
        </Stack>

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
            <Stack style={styles}>
              <Group grow>
                <TextInput
                  withAsterisk
                  label="Abstract title"
                  aria-label="Abstract title input"
                  {...form.getInputProps('abstract.title')}
                />
                <Checkbox
                  label="Poster"
                  aria-label="Poster checkbox"
                  {...form.getInputProps('abstract.poster', {
                    type: 'checkbox',
                  })}
                />
              </Group>
              <Group grow>
                <TextInput
                  label="Additional authors"
                  aria-label="Additional authors input"
                  {...form.getInputProps('abstract.additionalAuthors')}
                />
                <TextInput
                  label="Affiliation authors"
                  aria-label="Affiliation authors input"
                  {...form.getInputProps('abstract.affiliationAuthors')}
                />
              </Group>

              <Textarea
                autosize
                minRows={2}
                maxRows={5}
                label="Abstract"
                aria-label="Abstract input"
                {...form.getInputProps('abstract.abstract')}
              />
            </Stack>
          )}
        </Transition>
      </Stack>
    </form>
  );
};

export default ParticipantForm;
