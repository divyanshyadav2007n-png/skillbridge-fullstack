import axios from 'axios';

// 1. API Instance Create karna
const API = axios.create({
    // Is URL ko check kar lena, yahi aapka live backend hai
    baseURL: 'https://skillbridge-fullstack.vercel.app', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// 2. Request Interceptor (Token automatically bhejne ke liye)
API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

// 3. Response Interceptor (Errors handle karne ke liye)
API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error Detail:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default API;