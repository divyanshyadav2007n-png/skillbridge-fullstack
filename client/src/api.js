import axios from 'axios';

// 1. Aapka live Vercel backend URL
const API = axios.create({
  baseURL: 'https://skillbridge-fullstack-1e2v16mtp.vercel.app' 
});

// 2. Registration function
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

// 3. Login function
export const loginUser = async (userData) => {
  try {
    const response = await API.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// 4. Sabse important: Default export (taki Login.js ka error khatam ho jaye)
export default API;