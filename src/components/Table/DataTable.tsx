import {
  DataTable as DT,
  type DataTableProps as DTProps,
  type DataTableSortStatus,
} from 'mantine-datatable';
import { CloseButton, Stack, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import useSearch from '../../hooks/useSearch';
import useSort from '../../hooks/useSort';
import usePaginate from '../../hooks/usePaginate';

const PAGE_SIZES = [5, 10, 20, 50];

type DataTableProps<T> = DTProps<T> & {
  initialData: T[];
  sortStatus: DataTableSortStatus;
};

const DataTable = <T extends object>({
  initialData,
  sortStatus: initialSortStatus,
  columns,
  ...rest
}: DataTableProps<T>) => {
  // data pipeline: search -> sort -> paginate
  // search
  const { query, setQuery, searchResults } = useSearch({ data: initialData });

  // sorting
  const sort = useSort({
    data: searchResults,
    initialSortStatus: {
      accessor: initialSortStatus.columnAccessor,
      direction: initialSortStatus.direction,
    },
  });
  const {
    sortStatus: { accessor: columnAccessor, direction }, // rename accessor to columnAccessor
    sortResults,
  } = sort;
  const setSortStatus = ({
    columnAccessor: accessor, // rename columnAccessor to accessor
    direction,
  }: DataTableSortStatus) => sort.setSortStatus({ accessor, direction });

  // pagination
  const { page, setPage, perPage, setPerPage, paginateResults } = usePaginate({
    data: sortResults,
    initialPage: 1,
  });

  return (
    <Stack spacing="sm">
      <TextInput
        placeholder="Search"
        icon={<IconSearch size={18} />}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        rightSection={<CloseButton size={18} onClick={() => setQuery('')} />}
      />

      <DT
        withBorder
        minHeight="30rem"
        borderRadius="sm"
        highlightOnHover
        records={paginateResults}
        totalRecords={searchResults.length}
        page={page}
        recordsPerPage={perPage}
        onPageChange={(page) => setPage(page)}
        paginationText={({ from, to, totalRecords }) =>
          `Showing ${from} - ${to} of ${totalRecords}`
        }
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPerPage}
        sortStatus={{ columnAccessor, direction }}
        onSortStatusChange={setSortStatus}
        columns={columns}
        {...rest}
      />
    </Stack>
  );
};

export default DataTable;
