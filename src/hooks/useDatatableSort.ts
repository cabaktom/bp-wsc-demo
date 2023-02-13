import { useCallback, useEffect, useState } from 'react';
import { DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';

type useDatatableSortProps<T> = {
  data: T[];
  initialSortStatus: DataTableSortStatus;
};

const useDatatableSort = <T extends object>({
  data,
  initialSortStatus,
}: useDatatableSortProps<T>) => {
  const [sortResults, setSortResults] = useState<T[]>([]);

  const [sortStatus, setSortStatus] =
    useState<DataTableSortStatus>(initialSortStatus);

  const sortData = useCallback(
    (data: T[], sortStatus: DataTableSortStatus | undefined) => {
      if (!sortStatus) return data;

      const sortedData = sortBy(data, sortStatus.columnAccessor);
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

export default useDatatableSort;
