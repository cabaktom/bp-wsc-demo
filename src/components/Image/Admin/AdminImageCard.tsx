import { Box, createStyles } from '@mantine/core';
import type { Image as ImageType } from '@prisma/client';
import Image from 'next/image';

import AdminImageControls from './AdminImageControls';
import AdminImageInfo from './AdminImageInfo';

const useStyles = createStyles(() => ({
  wrapper: {
    position: 'relative',
    aspectRatio: '1/1',
  },
}));

type AdminImageCardProps = {
  image: ImageType;
};

const AdminImageCard = ({ image }: AdminImageCardProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Image src={image.path} alt={image.alt ?? ''} fill />

      <AdminImageControls image={image} />
      <AdminImageInfo image={image} />
    </Box>
  );
};

export default AdminImageCard;
