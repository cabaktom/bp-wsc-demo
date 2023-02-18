import useSWR from 'swr';
import type { Image } from '@prisma/client';

type useImagesReturnType = {
  images: Image[];
  isLoading: boolean;
  isError: boolean;
};

const useImages = (): useImagesReturnType => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/files/images', fetcher);

  return {
    images: data,
    isLoading,
    isError: error,
  };
};

export default useImages;
