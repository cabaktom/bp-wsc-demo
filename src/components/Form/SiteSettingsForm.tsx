import { useState } from 'react';
import { Alert, Button, Center, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { capitalize } from 'lodash';
import { IconCheck } from '@tabler/icons-react';
import { SiteSettings } from '@prisma/client';
import { useSession } from 'next-auth/react';

type SiteSettingsFormProps = {
  settings: SiteSettings[];
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings[]>>;
};

const SiteSettingsForm = ({ settings, setSettings }: SiteSettingsFormProps) => {
  const { data: session } = useSession();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const tmp = settings.map((setting) => ({
    [setting.option.split('_')[0]]: setting.value,
  }));

  const initialValues = Object.assign({}, ...tmp);

  const form = useForm({
    initialValues,
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    // split object to array of objects (object per property)
    const submitData = Object.keys(values).map((key) => ({
      option: `${key}_${session?.user.id}`,
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
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {error && (
        <Alert onClose={() => setError('')} withCloseButton={false} mb="xs">
          {error}
        </Alert>
      )}

      {settings
        .sort((a, b) => a.order - b.order)
        .map((setting) => {
          const title = setting.option.split('_')[0];

          return (
            <TextInput
              key={setting.id}
              withAsterisk
              label={capitalize(title)}
              aria-label={`${title} input`}
              mb="sm"
              {...form.getInputProps(title)}
            />
          );
        })}

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
