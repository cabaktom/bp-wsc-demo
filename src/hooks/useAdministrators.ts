import useSWR from 'swr';
import type { Admin } from '@prisma/client';

type useAdministratorsReturnType = {
  administrators: Admin[];
  isLoading: boolean;
  isError: boolean;
};

const useAdministrators = (): useAdministratorsReturnType => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/admins', fetcher);

  return {
    administrators: data,
    isLoading,
    isError: error,
  };
};

export default useAdministrators;
