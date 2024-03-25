import useSWR from 'swr';
import type { Image } from '@prisma/client';

type useImagesReturnType = {
  images: Image[];
  isLoading: boolean;
  isError: boolean;
};

/**
 * Fetches all images from the database.
 *
 * @returns An object containing the images, loading state and error state.
 */
const useImages = (userId = ''): useImagesReturnType => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/images', fetcher);
  const filteredData = data?.filter((p: Image) => p.adminId === userId);

  return {
    images: filteredData,
    isLoading,
    isError: error,
  };
};

export default useImages;
