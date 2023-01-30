import { useEffect, useState } from 'react';
import {
  DataTable as DT,
  type DataTableProps as DTProps,
  DataTableSortStatus,
} from 'mantine-datatable';
import sortBy from 'lodash/sortBy';

const PAGE_SIZES = [5, 10, 20, 50];

type DataTableProps<T> = DTProps<T> & {
  initialData: T[];
};

const DataTable = <T extends object>({
  initialData,
  columns,
  ...rest
}: DataTableProps<T>) => {
  // pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PAGE_SIZES[1]);
  // paginated data
  const [records, setRecords] = useState<T[]>([]);
  // all data
  const [data, setData] = useState(initialData);

  // change paginated data when page or perPage changes
  useEffect(() => {
    const from = (page - 1) * perPage;
    const to = from + perPage;
    setRecords(data.slice(from, to));
  }, [page, perPage, data]);

  useEffect(() => {
    setPage(1);
  }, [perPage]);

  // sorting
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'id',
    direction: 'asc',
  });

  useEffect(() => {
    const sortedData = sortBy(initialData, sortStatus.columnAccessor);
    setData(sortStatus.direction === 'asc' ? sortedData : sortedData.reverse());
  }, [sortStatus, initialData]);

  return (
    <>
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
