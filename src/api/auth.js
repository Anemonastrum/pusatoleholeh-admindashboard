import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 