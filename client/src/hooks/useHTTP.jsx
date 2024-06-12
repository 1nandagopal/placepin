import React, { useState } from "react";
import axios from "axios";

function useHTTP() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (
    url,
    method = "get",
    data = null,
    headers = {}
  ) => {
    setIsLoading(true);
    try {
      const response = await axios({ method, url, data, headers });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message || error.message);
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { sendRequest, isLoading, error, clearError };
}

export default useHTTP;
