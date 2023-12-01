import { useState, useEffect } from 'react';

const initOptions = {
  onSuccess: (data) => {},
  onError: (error) => {},
};

export function useFetch(keys, fetcher, options) {
  const [state, setState] = useState({
    data: null,
    isError: false,
    error: null,
    isLoading: true,
    isSuccess: false,
  });
  const [refetcher, setRefetcher] = useState();
  const newOptions = { ...initOptions, ...options };
  const { onSuccess, onError } = newOptions;

  const refetch = () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    setRefetcher(new Date());
  };

  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const data = await fetcher();

      setState((prev) => ({
        ...prev,
        isSuccess: true,
        data,
      }));
      onSuccess(data);
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false, isError: true, error }));
      onError(error);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [...keys, refetcher]);

  return { ...state, refetch };
}
