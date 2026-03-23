import axios from 'axios';
import { getAuthState, setTokens, logout } from '@/store/auth.store';
import { authServices } from './services/auth.services';

const BASE_URL = '/';

export const instance = axios.create({
  baseURL: BASE_URL,
});

// --- Interceptors ---

instance.interceptors.request.use((config) => {
  const { accessToken } = getAuthState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const { refreshToken, refreshTokenExpiresAt } = getAuthState();

      if (!refreshToken || (refreshTokenExpiresAt && Date.now() > refreshTokenExpiresAt)) {
        logout();
        return Promise.reject(error);
      }

      try {
        const { access, refresh } = await authServices.refreshToken(refreshToken);
        setTokens(access, refresh);
        original.headers.Authorization = `Bearer ${access}`;
        return instance(original);
      } catch {
        logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);
    return response.data;
  },

  async post<T, D = unknown>(url: string, data: D) {
    const response = await instance.post<T>(url, data);
    return response.data;
  },

  async patch<T, D = unknown>(url: string, data: D) {
    const response = await instance.patch<T>(url, data);
    return response.data;
  },

  async put<T, D = unknown>(url: string, data: D) {
    const response = await instance.put<T>(url, data);
    return response.data;
  },

  async delete(url: string) {
    return instance.delete(url);
  },
};
