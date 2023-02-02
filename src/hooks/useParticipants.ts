import { Abstract, Participant } from '@prisma/client';
import useSWR from 'swr';

type useParticipantsReturnType = {
  participants: (Participant & {
    abstract: Abstract;
  })[];
  isLoading: boolean;
  isError: boolean;
};

/**
 * @param abstracts include abstracts in response (default: true)
 * @returns participant data, loading state, and error state
 */
const useParticipants = (abstracts = true): useParticipantsReturnType => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/participants${!abstracts ? '?abstract=false' : ''}`,
    fetcher,
  );

  return {
    participants: data,
    isLoading,
    isError: error,
  };
};

export default useParticipants;
