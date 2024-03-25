import useSWR from 'swr';
import type { Abstract, Participant } from '@prisma/client';

type useParticipantsReturnType = {
  participants: (Participant & {
    abstract: Abstract;
  })[];
  isLoading: boolean;
  isError: boolean;
};

/**
 * Fetches all participants from the database.
 *
 * @param abstracts Whether to include abstracts or not (default: true).
 * @returns An object containing the participants, loading state and error state.
 */
const useParticipants = (
  userId = '',
  abstracts = true,
): useParticipantsReturnType => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/participants${!abstracts ? '?abstract=false' : ''}`,
    fetcher,
  );
  const filteredData = data?.filter((p: Participant) => p.adminId === userId);

  return {
    participants: filteredData,
    isLoading,
    isError: error,
  };
};

export default useParticipants;
