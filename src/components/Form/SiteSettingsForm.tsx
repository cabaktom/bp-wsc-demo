import { useState } from 'react';
import { Center, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { capitalize } from 'lodash';
import { z } from 'zod';

import { IconCheck } from '@tabler/icons';
import Button from '../Button/Button';
import Alert from './Alert';
import { SettingOut } from '../../schemas/Setting';

type SiteSettingsFormProps = {
  settings: z.infer<typeof SettingOut>[];
  setSettings: React.Dispatch<
    React.SetStateAction<z.infer<typeof SettingOut>[]>
  >;
};

const SiteSettingsForm = ({ settings, setSettings }: SiteSettingsFormProps) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const tmp = settings.map((setting) => ({
    [setting.option]: setting.value,
  }));

  const initialValues = Object.assign({}, ...tmp);

  const form = useForm({
    initialValues,
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    // split object to array of objects (object per property)
    const submitData = Object.keys(values).map((key) => ({
      option: key,
      value: values[key],
    }));

    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    });
    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(
        data.message ?? 'Error while saving site settings, please try again.',
      );
    } else {
      setError('');

      setSettings(data);

      showNotification({
        title: 'Success!',
        message: 'Changes saved.',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {error && (
        <Alert onClose={() => setError('')} withCloseButton={false}>
          {error}
        </Alert>
      )}

      {settings.map((setting) => (
        <TextInput
          key={setting.id}
          withAsterisk
          label={capitalize(setting.option)}
          aria-label={`${setting.option} input`}
          mb="sm"
          {...form.getInputProps(setting.option)}
        />
      ))}

      <Center>
        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={!form.isValid()}
          mt="xs"
        >
          Save
        </Button>
      </Center>
    </form>
  );
};

export default SiteSettingsForm;
