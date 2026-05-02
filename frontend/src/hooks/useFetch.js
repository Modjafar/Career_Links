import { useState, useEffect, useCallback } from 'react';
import api from '../services/api.js';

export const useFetch = (url, options = {}) => {
    const { immediate = true, params = {} } = options;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (customParams = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(url, {
                params: { ...params, ...customParams },
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'An error occurred';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [url, JSON.stringify(params)]);

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [fetchData, immediate]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
