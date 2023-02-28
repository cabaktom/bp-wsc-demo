import { useCallback, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';

type SortStatus = {
  accessor: string;
  direction: 'asc' | 'desc';
};

type useSortProps<T> = {
  data: T[];
  initialSortStatus: SortStatus | undefined;
};

const useSort = <T extends object>({
  data,
  initialSortStatus,
}: useSortProps<T>) => {
  const [sortResults, setSortResults] = useState<T[]>([]);

  const [sortStatus, setSortStatus] = useState<SortStatus | undefined>(
    initialSortStatus,
  );

  const sortData = useCallback(
    (data: T[], sortStatus: SortStatus | undefined) => {
      if (!sortStatus) return data;

      const sortedData = sortBy(data, sortStatus.accessor);
      if (sortStatus.direction === 'desc') sortedData.reverse();

      return sortedData;
    },
    [],
  );

  useEffect(() => {
    setSortResults(sortData(data, sortStatus));
  }, [sortStatus, data, sortData]);

  return { sortStatus, setSortStatus, sortResults };
};

export default useSort;
