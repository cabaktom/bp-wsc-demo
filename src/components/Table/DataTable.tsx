import { useCallback, useEffect, useState } from 'react';
import {
  DataTable as DT,
  type DataTableProps as DTProps,
  type DataTableSortStatus,
} from 'mantine-datatable';
import { useDebouncedValue } from '@mantine/hooks';
import { CloseButton, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import sortBy from 'lodash/sortBy';
import keys from 'lodash/keys';

const PAGE_SIZES = [5, 10, 20, 50];

type DataTableProps<T> = DTProps<T> & {
  initialData: T[];
};

const DataTable = <T extends object>({
  initialData,
  columns,
  ...rest
}: DataTableProps<T>) => {
  // all data
  const [data, setData] = useState(initialData);

  // pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PAGE_SIZES[1]);
  // paginated data
  const [records, setRecords] = useState<T[]>([]);

  // search
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  // change paginated data when page or perPage changes
  useEffect(() => {
    const from = (page - 1) * perPage;
    const to = from + perPage;
    setRecords(data.slice(from, to));
  }, [page, perPage, data]);

  useEffect(() => {
    setPage(1);
  }, [perPage]);

  // searching and sorting
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>();

  const filterData = useCallback((data: T[], search: string) => {
    const query = search.toLowerCase().trim();

    return data.filter((item) =>
      Object.values(item).some((value) => {
        if (typeof value === 'object') {
          return keys(value).some((key) =>
            value[key].toString().toLowerCase().includes(query),
          );
        }
        return value.toString().toLowerCase().includes(query);
      }),
    );
  }, []);

  const sortData = useCallback(
    (data: T[], sortStatus: DataTableSortStatus | undefined, query: string) => {
      if (!sortStatus) return filterData(data, query);

      const sortedData = sortBy(data, sortStatus.columnAccessor);
      if (sortStatus.direction === 'desc') sortedData.reverse();

      return filterData(sortedData, query);
    },
    [filterData],
  );

  useEffect(() => {
    setData(sortData(initialData, sortStatus, debouncedQuery));
  }, [sortStatus, debouncedQuery, initialData, sortData]);

  return (
    <>
      <TextInput
        placeholder="Search"
        icon={<IconSearch size={18} />}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        rightSection={<CloseButton size={18} onClick={() => setQuery('')} />}
      />

      <DT
        withBorder
        minHeight="32rem"
        borderRadius="sm"
        highlightOnHover
        records={records}
        totalRecords={data.length}
        page={page}
        recordsPerPage={perPage}
        onPageChange={(page) => setPage(page)}
        paginationText={({ from, to, totalRecords }) =>
          `Showing ${from} - ${to} of ${totalRecords}`
        }
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPerPage}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        columns={columns}
        {...rest}
      />
    </>
  );
};

export default DataTable;
