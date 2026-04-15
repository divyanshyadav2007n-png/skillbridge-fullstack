import axios from 'axios';

// Aapka Vercel backend URL
const API = axios.create({
  baseURL: 'https://skillbridge-fullstack.vercel.app'
});

// Register function
export const registerUser = (userData) => API.post('/api/auth/register', userData);

// Login function
export const loginUser = (userData) => API.post('/api/auth/login', userData);

export default API;