import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    method = "GET",
    data: requestData = null,
    headers = {},
    skip = false,
  } = options;

  // Fetch function
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      // Add data for non-GET requests
      if (requestData && method !== "GET") {
        config.data = requestData;
      }

      // Get token from localStorage if available
      const token = localStorage.getItem("adminToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios(config);

      setData(response.data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while fetching data",
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Run fetch on mount or when dependencies change
  useEffect(() => {
    if (skip || !url) {
      setLoading(false);
      return;
    }

    fetchData();
  }, [url, skip]);

  // Refetch function to manually trigger the request
  const refetch = async () => {
    await fetchData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useFetch;
