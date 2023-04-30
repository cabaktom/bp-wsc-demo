import { useCallback, useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';

import type { SortStatus } from '../@types';

type useSortProps<T> = {
  data: T[];
  initialSortStatus: SortStatus;
  initialData?: T[];
};

const useSort = <T extends object>({
  data,
  initialSortStatus,
  initialData,
}: useSortProps<T>) => {
  const [sortResults, setSortResults] = useState<T[]>(initialData ?? []);

  const [sortStatus, setSortStatus] = useState<SortStatus>(initialSortStatus);

  const sortData = useCallback((data: T[], sortStatus: SortStatus) => {
    const sortedData = orderBy(
      data,
      [
        (item) => {
          const value = get(item, sortStatus.accessor);
          if (typeof value === 'string') return value.toLowerCase();
          return value;
        },
      ],
      [sortStatus.direction],
    );

    return sortedData;
  }, []);

  useEffect(() => {
    setSortResults(sortData(data, sortStatus));
  }, [sortStatus, data, sortData]);

  return { sortStatus, setSortStatus, sortResults };
};

export default useSort;
