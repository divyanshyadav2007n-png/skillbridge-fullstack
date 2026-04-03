import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api'; // Hamari Axios instance

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Vercel backend par login request
            const response = await API.post('/api/login', { email, password });
            
            if (response.status === 200) {
                const data = response.data;
                alert("✅ Login Successful!");

                // Token aur User info save karna (Auth ke liye zaroori hai)
                localStorage.setItem('user', JSON.stringify(data.user || data));
                
                // Dashboard par bhej do
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Login Error:", err);
            // Backend se aane wala error message (e.g., "Invalid Credentials")
            const msg = err.response?.data?.message || "Login failed. Please try again.";
            alert("❌ " + msg);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email"
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter password"
                        required 
                    />
                </div>
                <button type="submit" className="btn-auth">Login</button>
            </form>
            <p className="auth-footer">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;