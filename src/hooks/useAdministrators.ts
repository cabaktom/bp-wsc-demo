import useSWR from 'swr';
import type { Admin } from '@prisma/client';

type useAdministratorsReturnType = {
  administrators: Admin[];
  isLoading: boolean;
  isError: boolean;
};

/**
 * Fetches all administrators from the database.
 *
 * @returns An object containing the administrators, loading state and error state.
 */
const useAdministrators = (userId = ''): useAdministratorsReturnType => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/admins', fetcher);
  const filteredData = data?.filter(
    (p: Admin) => p.createdByAdminId === userId,
  );

  return {
    administrators: filteredData,
    isLoading,
    isError: error,
  };
};

export default useAdministrators;
