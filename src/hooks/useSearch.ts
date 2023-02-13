import { useCallback, useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import keys from 'lodash/keys';

type useSearchProps<T> = {
  data: T[];
};

const useSearch = <T extends object>({ data }: useSearchProps<T>) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const [searchResults, setSearchResults] = useState(data);

  const filterData = useCallback((data: T[], queryRaw: string) => {
    const query = queryRaw.toLowerCase().trim();
    if (!query) return data;

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

  useEffect(() => {
    setSearchResults(filterData(data, debouncedQuery));
  }, [debouncedQuery, data, filterData]);

  return { query, setQuery, searchResults };
};

export default useSearch;
