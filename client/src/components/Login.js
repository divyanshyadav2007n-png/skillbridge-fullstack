import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        // API call
        const response = await API.post('/api/login', { email, password });
        
        const data = response.data;

        if (response.status === 200) {
            alert("✅ Login Successful!");
            localStorage.setItem('user', JSON.stringify(data.user || data)); 
            navigate('/dashboard'); 
        }
    } catch (error) {
        console.error("Login Error:", error);
        const msg = error.response?.data?.message || "Invalid credentials!";
        alert("❌ " + msg);
    }
};

    return (
        <div className="auth-container">
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            <p>New user? <a href="/">Register here</a></p>
        </div>
    );
};

export default Login;