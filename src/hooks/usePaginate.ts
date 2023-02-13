import { useEffect, useState } from 'react';

type usePaginateProps<T> = {
  data: T[];
  initialPage: number;
};

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
