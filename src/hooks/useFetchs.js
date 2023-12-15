import { useState, useEffect } from 'react';
import axios from 'axios';

const initOptions = {
  onSuccess: (data) => {},
  onError: (error) => {},
};

export function useFetchs(keys, fetchers, options) {
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
    setRefetcher(new Date());
  };

  const fetchData = async () => {
    return await Promise.all(fetchers.map((apiObj) => axios(apiObj)));
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      isSuccess: false,
      isError: false,
    }));

    fetchData()
      .then((data) => {
        const mapedData = data.map(({ data }) => data);

        setState((prev) => ({
          ...prev,
          data: mapedData,
          isSuccess: true,
        }));
        onSuccess(mapedData);
      })
      .catch((error) => {
        setState((prev) => ({ ...prev, isError: true, error }));
        onError(error);
      })
      .finally(() => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      });
  }, [...keys, refetcher]);

  return { ...state, refetch, setState };
}
