import { useSWRConfig } from 'swr';
import { ActionIcon, Flex, createStyles } from '@mantine/core';
import { IconExternalLink, IconSettings, IconTrash } from '@tabler/icons-react';
import type { Image as ImageType } from '@prisma/client';
import { openContextModal } from '@mantine/modals';
import EditImageForm from '../../Form/EditImageForm';

const useStyles = createStyles((theme) => ({
  controls: {
    position: 'absolute',
    width: '100%',
    height: 'max-content',
    padding: '.4rem .4rem .4rem 0',
    gap: '2px',
  },
  icon: {
    color: `${theme.colors.gray[0]} !important`, // link icon color
    backgroundColor: theme.fn.rgba(theme.colors.dark[4], 0.5),
    transition: 'all .1s',

    '&:hover': {
      backgroundColor: theme.fn.rgba(theme.colors.dark[4], 0.8),

      '&:has(svg[class$=trash])': {
        backgroundColor: theme.fn.rgba(theme.colors.red[9], 0.8),
      },
    },
  },
}));

type AdminImageControlsProps = {
  image: ImageType;
};

const AdminImageControls = ({ image }: AdminImageControlsProps) => {
  const { classes } = useStyles();
  const { mutate } = useSWRConfig();

  const handleEdit = () => {
    openContextModal({
      modal: 'edit',
      title: 'Edit image',
      size: 'sm',
      innerProps: {
        modalBody: <EditImageForm {...image} />,
      },
    });
  };

  const handleDelete = (image: ImageType) => {
    openContextModal({
      modal: 'delete',
      title: 'Delete image',
      size: 'md',
      innerProps: {
        modalBody: `Are you sure you want to delete image '${image.originalFilename}'?`,
        subjectId: image.id,
        subjectTitle: 'Image',
        actionUrl: '/api/images',
      },
      onClose: () => mutate('/api/images'),
    });
  };

  return (
    <Flex className={classes.controls} align="center">
      <ActionIcon
        ml="auto"
        className={classes.icon}
        component="a"
        href={`/api/images/download/${encodeURIComponent(image.filename)}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Open image in new tab"
      >
        <IconExternalLink size={16} />
      </ActionIcon>

      <ActionIcon
        className={classes.icon}
        title="Edit image"
        onClick={handleEdit}
      >
        <IconSettings size={16} />
      </ActionIcon>

      <ActionIcon
        className={classes.icon}
        title="Delete image"
        onClick={() => handleDelete(image)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Flex>
  );
};

export default AdminImageControls;
