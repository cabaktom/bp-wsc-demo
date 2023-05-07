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
const useImages = (): useImagesReturnType => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/images', fetcher);

  return {
    images: data,
    isLoading,
    isError: error,
  };
};

export default useImages;
