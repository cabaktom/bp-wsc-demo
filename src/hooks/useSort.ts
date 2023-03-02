import { useCallback, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';

import type { SortStatus } from '../@types';

type useSortProps<T> = {
  data: T[];
  initialSortStatus: SortStatus;
};

const useSort = <T extends object>({
  data,
  initialSortStatus,
}: useSortProps<T>) => {
  const [sortResults, setSortResults] = useState<T[]>([]);

  const [sortStatus, setSortStatus] = useState<SortStatus>(initialSortStatus);

  const sortData = useCallback((data: T[], sortStatus: SortStatus) => {
    const sortedData = sortBy(data, sortStatus.accessor);
    if (sortStatus.direction === 'desc') sortedData.reverse();

    return sortedData;
  }, []);

  useEffect(() => {
    setSortResults(sortData(data, sortStatus));
  }, [sortStatus, data, sortData]);

  return { sortStatus, setSortStatus, sortResults };
};

export default useSort;
