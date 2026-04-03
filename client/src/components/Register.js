import React, { useState } from 'react';
import API from '../api';
const Register = () => {
    // 1. State setup (Saare extra brackets hata diye hain)
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
        // Line 20-24 replace ho gayi isse:
        const response = await API.post('/api/register', formData);
        
        // Agar response sahi hai
        if (response.status === 200 || response.status === 201) {
            alert("Registration Successful!");
            console.log("Success:", response.data);
        }
    } catch (err) {
        console.error("Network Error:", err);
        // Agar server error de (jaise email already exists)
        const errorMsg = err.response?.data?.message || "Server se connect nahi ho pa raha.";
        alert(errorMsg);
    }
};

    return (
        <div className="auth-container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name:</label><br/>
                    <input name="name" placeholder="Enter Name" onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label><br/>
                    <input name="email" type="email" placeholder="Enter Email" onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Role:</label><br/>
                    <select name="role" onChange={handleChange}>
                        <option value="Student">Student</option>
                        <option value="Employer">Employer</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label><br/>
                    <input name="password" type="password" placeholder="Enter Password" onChange={handleChange} required />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Register;