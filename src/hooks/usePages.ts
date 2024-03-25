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
const usePages = (userId = ''): usePagesReturnType => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/pages', fetcher);
  const filteredData = data?.filter((p: Page) => p.adminId === userId);

  return {
    pages: filteredData,
    isLoading,
    isError: error,
  };
};

export default usePages;
