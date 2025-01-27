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

export const getAllCategories = async () => {
  try {
    const response = await api.get(`${API_URL}/category`);
    return response.data.categories;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get(`${API_URL}/category`);
    return response.data.categories;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`${API_URL}/category/${categoryId}`);
    return response.data.products;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const addNewCategory = async (categoryData) => {
  try {
    const response = await api.post(`${API_URL}/category/add`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await api.put(`${API_URL}/category/update/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await api.delete(`${API_URL}/category/delete/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const uploadCategoryImage = async (categoryId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post(
      `${API_URL}/category/upload/image/${categoryId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 