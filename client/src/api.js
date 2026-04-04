import axios from 'axios';

const API = axios.create({
    baseURL: 'https://skillbridge-fullstack.vercel.app' 
});

export const registerUser = async (userData) => {
    const response = await API.post('/api/auth/register', userData);
    return response.data;
};

export default API;