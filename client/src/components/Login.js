import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Login Successful!");
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard'); // Login ke baad dashboard pe bhejne ke liye
            } else {
                alert("❌ " + data.message);
            }
        } catch (error) {
            alert("Server Error! Check if backend is running.");
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