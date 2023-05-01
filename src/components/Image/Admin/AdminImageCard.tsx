import { Box, createStyles, useMantineTheme } from '@mantine/core';
import type { Image as ImageType } from '@prisma/client';
import Image from 'next/image';

import AdminImageControls from './AdminImageControls';
import AdminImageInfo from './AdminImageInfo';

const useStyles = createStyles(() => ({
  wrapper: {
    position: 'relative',
    aspectRatio: '1/1',
  },
  image: {
    objectFit: 'cover',
  },
}));

type AdminImageCardProps = {
  image: ImageType;
  priority: boolean;
};

const AdminImageCard = ({ image, priority }: AdminImageCardProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Box className={classes.wrapper}>
      <Image
        className={classes.image}
        src={`/api/download/images/${encodeURIComponent(image.filename)}`}
        alt={image.alt ?? ''}
        fill
        sizes={`(max-width: ${theme.breakpoints.xs}) 100vw,
                (min-width: ${theme.breakpoints.xs}) 50vw, 
                (min-width: ${theme.breakpoints.sm}) 33.3vw, 
                (min-width: ${theme.breakpoints.md}) 25vw, 
                (min-width: ${theme.breakpoints.lg}) 20vw`}
        priority={priority}
      />

      <AdminImageControls image={image} />
      <AdminImageInfo image={image} />
    </Box>
  );
};

export default AdminImageCard;
