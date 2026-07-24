import axios from 'axios';
import { mockHandlers } from '../mocks/mockHandlers';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/School_Management_System/backend/public/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 1500,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('edusphere_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const isMockMode = () => USE_MOCK;

export { apiClient, mockHandlers };
