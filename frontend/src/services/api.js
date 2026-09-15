import axios from 'axios';

export const API_BASE_URL = (import.meta.env.VITE_API_URL?.trim() || 'https://cleanxl-ai.onrender.com').replace(/\/$/, '');

export const apiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Log full error for debugging
    console.error('[API Error]', {
      url: err?.config?.url,
      status: err?.response?.status,
      data: err?.response?.data,
      message: err?.message,
    });
    // Reject with full error so callers can inspect it
    return Promise.reject(err);
  }
);

export default api;
