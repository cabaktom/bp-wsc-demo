import { FormEventHandler, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import { Button, FileInput, createStyles } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconUpload, IconX } from '@tabler/icons-react';

import FileInputValue from '../Input/FileInputValue';

const useStyles = createStyles(() => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },
  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
    cursor: 'default',
  },
  control: {
    position: 'absolute',
    width: 200,
    left: 'calc(50% - 100px)',
    bottom: -20,
  },
}));

const UploadImageForm = () => {
  const { classes } = useStyles();
  const { mutate } = useSWRConfig();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const res = await fetch('/api/images', {
      method: 'POST',
      body: formData,
    });
    setLoading(false);

    const data = await res.json();
    if (!res.ok) {
      showNotification({
        title: 'Error!',
        message: data.message ?? 'Images could not be uploaded.',
        color: 'red',
        icon: <IconX size={16} />,
      });
    } else {
      showNotification({
        title: 'Success!',
        message: data.message ?? 'Images uploaded.',
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      mutate('/api/images');
    }

    setFiles([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={setFiles}
          activateOnClick={false}
          className={classes.dropzone}
          radius="md"
          accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
          maxSize={30 * 1024 ** 2}
          styles={{ inner: { pointerEvents: 'all' } }}
          disabled={loading}
        >
          <FileInput
            clearable
            multiple
            label="Upload images"
            aria-label="Upload images input"
            placeholder="Choose image(s) or drag and drop"
            description="Only .png/.jpg/.jpeg files that are less than 30MB are accepted."
            icon={<IconUpload size={16} />}
            accept="image/jpg,image/jpeg,image/png,"
            value={files}
            onChange={setFiles}
            w="100%"
            valueComponent={FileInputValue}
          />
        </Dropzone>

        <Button
          type="submit"
          size="md"
          radius="xl"
          loading={loading}
          disabled={files.length === 0}
          className={classes.control}
        >
          Upload
        </Button>
      </div>
    </form>
  );
};

export default UploadImageForm;
