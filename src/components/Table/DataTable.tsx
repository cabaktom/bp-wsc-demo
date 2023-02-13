import {
  DataTable as DT,
  type DataTableProps as DTProps,
  type DataTableSortStatus,
} from 'mantine-datatable';
import { CloseButton, Stack, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import useSearch from '../../hooks/useSearch';
import usePaginate from '../../hooks/usePaginate';
import useDatatableSort from '../../hooks/useDatatableSort';

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
  const { sortStatus, setSortStatus, sortResults } = useDatatableSort({
    data: searchResults,
    initialSortStatus,
  });

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
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        columns={columns}
        {...rest}
      />
    </Stack>
  );
};

export default DataTable;
