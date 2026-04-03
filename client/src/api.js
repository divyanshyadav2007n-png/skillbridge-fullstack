import axios from 'axios';

const API = axios.create({ 
    baseURL: 'https://skillbridge-fullstack.vercel.app' 
});

API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        // Dhyaan dena yahan backticks (`) use kiye hain
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
});

export default API;