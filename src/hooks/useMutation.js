import { useState } from 'react';

const initOptions = {
  onSuccess: (data) => {},
  onError: (error) => {},
};

export function useMutation(mutater, options) {
  const [state, setState] = useState({
    isError: false,
    error: null,
    isLoading: false,
    isSuccess: false,
  });

  const newOptions = { ...initOptions, ...options };
  const { onSuccess, onError } = newOptions;

  const mutate = async (params) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const response = await mutater(params);

      setState((prev) => ({ ...prev, isSuccess: true }));
      onSuccess(response);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isError: true,
        error,
      }));
      onError(error);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return { ...state, mutate };
}
