import { useCallback } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || '/api' });

const useFetch = () => {
  const { token } = useAuth();

  const withAuth = useCallback((config = {}) => {
    const headers = { ...(config.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    return { ...config, headers };
  }, [token]);

  const get = useCallback(async (url, config) => {
    const res = await instance.get(url, withAuth(config));
    return res.data;
  }, [withAuth]);

  const post = useCallback(async (url, body, config) => {
    const res = await instance.post(url, body, withAuth(config));
    return res.data;
  }, [withAuth]);

  const put = useCallback(async (url, body, config) => {
    const res = await instance.put(url, body, withAuth(config));
    return res.data;
  }, [withAuth]);

  const del = useCallback(async (url, config) => {
    const res = await instance.delete(url, withAuth(config));
    return res.data;
  }, [withAuth]);

  return { get, post, put, del };
};

export default useFetch;


