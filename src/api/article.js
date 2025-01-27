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

export const getAllArticles = async () => {
  try {
    const response = await api.get(`${API_URL}/article/list`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await api.post(`${API_URL}/article/create`, articleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateArticle = async (articleId, articleData) => {
  try {
    const response = await api.put(`${API_URL}/article/update/${articleId}`, articleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const response = await api.delete(`${API_URL}/article/delete/${articleId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const uploadArticleCover = async (articleId, coverFile) => {
  try {
    const formData = new FormData();
    formData.append('image', coverFile);

    const response = await api.post(
      `${API_URL}/article/upload/cover/${articleId}`,
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

export const uploadArticleImages = async (articleId, imageFiles) => {
  try {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append('image', file);
    });

    const response = await api.post(
      `${API_URL}/article/upload/image/${articleId}`,
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

export const deleteArticleImage = async (articleId, imageId) => {
  try {
    const response = await api.delete(`${API_URL}/article/delete/image/${articleId}/${imageId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteArticleCover = async (articleId) => {
  try {
    const response = await api.delete(`${API_URL}/article/delete/cover/${articleId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 