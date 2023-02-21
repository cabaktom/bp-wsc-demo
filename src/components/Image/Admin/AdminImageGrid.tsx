import { Center, SimpleGrid, Text } from '@mantine/core';

import AdminImageCard from './AdminImageCard';
import useImages from '../../../hooks/useImages';

const AdminImageGrid = () => {
  const { images } = useImages();

  if (images.length === 0) {
    return (
      <Center mt="xl">
        <Text>No images found.</Text>
      </Center>
    );
  }

  return (
    <>
      <SimpleGrid
        cols={1}
        spacing="xs"
        verticalSpacing="xs"
        breakpoints={[
          { minWidth: 'lg', cols: 5, spacing: 'xs', verticalSpacing: 'xs' },
          { minWidth: 'md', cols: 4, spacing: 'xs', verticalSpacing: 'xs' },
          { minWidth: 'sm', cols: 3, spacing: 'xs', verticalSpacing: 'xs' },
          { minWidth: 'xs', cols: 2, spacing: 'xs', verticalSpacing: 'xs' },
        ]}
      >
        {images.map((image, index) => (
          <AdminImageCard key={image.id} image={image} priority={index < 15} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default AdminImageGrid;
