import axios from 'axios';

// Aapka Vercel backend URL
const API = axios.create({
  baseURL: 'skillbridge-fullstack-1e2v16mtp.vercel.app'
});

// Request interceptor (Optional: Token bhejne ke liye agar login system hai)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Register function
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

// Login function
export const loginUser = async (userData) => {
  try {
    const response = await API.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

export default API;