import { useState } from 'react';
import axios from 'axios';

/**
 * Custom hook for making POST API calls
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Additional axios options
 * @returns {Object} - { data, loading, error, execute }
 */
export const usePostApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (payload, customOptions = {}) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.post(url, payload, {
        ...options,
        ...customOptions
      });
      
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
};
