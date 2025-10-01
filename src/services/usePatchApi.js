import { useState } from 'react';
import axios from 'axios';

/**
 * Custom hook for making PATCH API calls
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Additional axios options
 * @returns {Object} - { data, loading, error, execute, reset }
 */
export const usePatchApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (payload, customOptions = {}) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.patch(url, payload, {
        ...options,
        ...customOptions
      });
      
      setData(response.data);
      return response.data;
    } catch (err) {
      let errorMessage = 'An error occurred';
      
      if (err.response?.data) {
        // Try different possible error message fields
        errorMessage = err.response.data.message || 
                     err.response.data.error || 
                     err.response.data.msg ||
                     err.response.data;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      // Handle specific status codes
      if (err.response?.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (err.response?.status === 401) {
        errorMessage = 'Unauthorized. Please check your credentials.';
      } else if (err.response?.status === 404) {
        errorMessage = 'Resource not found.';
      } else if (err.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
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
