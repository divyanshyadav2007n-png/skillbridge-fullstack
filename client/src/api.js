import axios from 'axios';

// Aapka Vercel URL (Bina aakhri slash ke)
const API = axios.create({
    baseURL: 'https://skillbridge-fullstack.vercel.app'
});

// Register Function
export const registerUser = async (userData) => {
    try {
        const response = await API.post('/api/auth/register', userData);
        return response.data;
    } catch (error) {
        // Isse humein exact error pata chalega console mein
        console.error("API Error Details:", error.response ? error.response.data : error.message);
        throw error;
    }
};
export default API;