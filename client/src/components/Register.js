import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api'; // Axios instance

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Student',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Vercel backend par request bhej raha hai
            const response = await API.post('/api/register', formData);
            
            if (response.status === 200 || response.status === 201) {
                alert("✅ Registration Successful!");
                navigate('/login');
            }
        } catch (err) {
            console.error("Network Error:", err);
            // Backend se aane wala specific error dikhayega
            const errorMsg = err.response?.data?.message || "Server se connect nahi ho pa raha.";
            alert("❌ " + errorMsg);
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input 
                        type="text" name="name" placeholder="Enter your name" 
                        onChange={handleChange} required 
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" name="email" placeholder="Enter email" 
                        onChange={handleChange} required 
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select name="role" onChange={handleChange}>
                        <option value="Student">Student</option>
                        <option value="Company">Company</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" name="password" placeholder="Min 6 characters" 
                        onChange={handleChange} required 
                    />
                </div>
                <button type="submit" className="btn-auth">Register</button>
            </form>
            <p className="auth-footer">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;