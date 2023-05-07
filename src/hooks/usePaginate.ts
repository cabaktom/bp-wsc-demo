import { useEffect, useState } from 'react';

type usePaginateProps<T> = {
  data: T[];
  initialPage: number;
};

/**
 * Paginates data.
 *
 * @param data The data to paginate.
 * @param initialPage The initial page to start on.
 * @returns An object containing the current page, the current page setter, the current number of items per page, the current number of items per page setter, and the paginated results.
 */
const usePaginate = <T extends object>({
  data,
  initialPage = 1,
}: usePaginateProps<T>) => {
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(10);

  const [paginateResults, setPaginateResults] = useState<T[]>([]);

  useEffect(() => {
    const from = (page - 1) * perPage;
    const to = from + perPage;
    setPaginateResults(data.slice(from, to));
  }, [page, perPage, data]);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage, perPage]);

  return { page, setPage, perPage, setPerPage, paginateResults };
};

export default usePaginate;
