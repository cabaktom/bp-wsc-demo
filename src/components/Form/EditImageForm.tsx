import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import type { Image } from '@prisma/client';

import MyButton from '../Button/MyButton';
import MyAlert from './MyAlert';

type EditImageFormProps = Image;

const EditImageForm = ({ id, alt, filename }: EditImageFormProps) => {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      alt,
      filename,
    },
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const res = await fetch(`/api/files/images/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.message ?? 'Error while editing image, please try again.');
    } else {
      setError('');
      showNotification({
        title: 'Success!',
        message: 'Image changes saved.',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });

      mutate('/api/files/images');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {error && (
        <MyAlert onClose={() => setError('')} withCloseButton={false} mb="xs">
          {error}
        </MyAlert>
      )}

      <Stack spacing="sm">
        <TextInput
          placeholder="Title describing the image"
          label="Title"
          aria-label="Title input"
          {...form.getInputProps('alt')}
        />
        <TextInput
          withAsterisk
          placeholder="image.png"
          label="Filename"
          aria-label="Filename input"
          {...form.getInputProps('filename')}
        />

        <MyButton
          type="submit"
          fullWidth
          loading={loading}
          disabled={!form.isValid()}
          mt="xs"
        >
          Save
        </MyButton>
      </Stack>
    </form>
  );
};

export default EditImageForm;
