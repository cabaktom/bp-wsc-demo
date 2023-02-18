import { Box, Text, createStyles } from '@mantine/core';
import type { Image as ImageType } from '@prisma/client';

const useStyles = createStyles(() => ({
  info: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 'max-content',
    width: '100%',
    padding: '.25rem .75rem',
  },
}));

type AdminImageInfoProps = {
  image: ImageType;
};

const AdminImageInfo = ({ image }: AdminImageInfoProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.info}>
      <Text fz="xs" c="white">
        {image.alt || 'Missing title'}
      </Text>
      <Text fz="xs" c="white">
        {image.filename}
      </Text>
    </Box>
  );
};

export default AdminImageInfo;
