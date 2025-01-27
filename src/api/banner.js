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

export const uploadBanner = async (bannerData) => {
  try {
    const formData = new FormData();
    formData.append('banner', bannerData);

    const response = await api.post(`${API_URL}/hero/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateBanner = async (bannerId, bannerData) => {
  try {
    const formData = new FormData();
    formData.append('banner', bannerData);

    const response = await api.put(`${API_URL}/hero/update/${bannerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteBanner = async (bannerId) => {
  try {
    const response = await api.delete(`${API_URL}/hero/delete/${bannerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 