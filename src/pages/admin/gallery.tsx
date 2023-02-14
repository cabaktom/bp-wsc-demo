import { FormEventHandler, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FileInput, createStyles } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconUpload, IconX } from '@tabler/icons-react';

import AdminLayout from '../../components/Layout/AdminLayout';
import type { NextPageWithLayout } from '../../@types';
import MyButton from '../../components/Button/MyButton';

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

type GalleryPageProps = {};

const GalleryPage: NextPageWithLayout<GalleryPageProps> = () => {
  const { classes } = useStyles();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const objectUrl = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrl);

    return () => {
      objectUrl.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const res = await fetch('/api/files/images', {
      method: 'POST',
      body: formData,
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      showNotification({
        title: 'Error!',
        message: data.message ?? 'Images could not be uploaded.',
        color: 'green',
        icon: <IconX size={16} />,
        autoClose: 4000,
      });
    } else {
      showNotification({
        title: 'Success!',
        message: 'Images uploaded.',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
    }

    setFiles([]);
  };

  return (
    <>
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
              placeholder="Choose image(s) or drag and drop inside this area"
              description="Only .png/.jpg/.jpeg files that are less than 30MB are accepted."
              icon={<IconUpload size={16} />}
              accept="image/jpg,image/jpeg,image/png,"
              value={files}
              onChange={setFiles}
              w="100%"
            />
          </Dropzone>

          <MyButton
            type="submit"
            size="md"
            radius="xl"
            loading={loading}
            disabled={files.length === 0}
            className={classes.control}
          >
            Upload
          </MyButton>
        </div>
      </form>

      {previews.map((preview) => (
        <Image
          key={preview}
          alt="Preview"
          src={preview}
          width={200}
          height={200}
        />
      ))}
    </>
  );
};

GalleryPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default GalleryPage;
