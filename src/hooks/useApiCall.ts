import { useState } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useApiCall = <T>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const execute = async (apiCall: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null, success: false });

    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null, success: true });
      return result;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage, success: false });
      throw error;
    }
  };

  const reset = () => {
    setState({ data: null, loading: false, error: null, success: false });
  };

  return { ...state, execute, reset };
};