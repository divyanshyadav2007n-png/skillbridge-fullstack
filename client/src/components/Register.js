import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending data:", formData);
            const data = await registerUser(formData);
            alert("🎉 Registration Successful!");
            console.log("Response:", data);
        } catch (err) {
            console.error("Error:", err);
            alert("❌ Server Error: Connection failed.");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
            <div style={{ display: 'inline-block', padding: '30px', border: '1px solid #ccc', borderRadius: '10px' }}>
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Name:</label><br/>
                        <input type="text" placeholder="Enter Name" style={{ width: '100%', padding: '8px' }}
                               onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email:</label><br/>
                        <input type="email" placeholder="Enter Email" style={{ width: '100%', padding: '8px' }}
                               onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Password:</label><br/>
                        <input type="password" placeholder="Enter Password" style={{ width: '100%', padding: '8px' }}
                               onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Role:</label><br/>
                        <select style={{ width: '100%', padding: '8px' }} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                            <option value="Student">Student</option>
                            <option value="Employer">Employer</option>
                        </select>
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;