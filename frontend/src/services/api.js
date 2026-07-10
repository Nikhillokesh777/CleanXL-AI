import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
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
