import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getOverview = async () => {
  try {
    const response = await api.get(`${API_URL}/admin/overview`);
    // Mengambil data dari response.data.totals
    return response.data.totals;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 