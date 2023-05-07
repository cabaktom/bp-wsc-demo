import useSWR from 'swr';
import type { Page } from '@prisma/client';

type usePagesReturnType = {
  pages: Page[];
  isLoading: boolean;
  isError: boolean;
};

/**
 * Fetches all pages from the database.
 *
 * @returns An object containing the pages, loading state and error state.
 */
const usePages = (): usePagesReturnType => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/pages', fetcher);

  return {
    pages: data,
    isLoading,
    isError: error,
  };
};

export default usePages;
