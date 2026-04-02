import React, { useState } from 'react';

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
            // 2. Fetch URL - Local Testing ke liye 5001 use kar rahe hain
            const response = await fetch('http://localhost:5001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration Successful!");
                console.log("Success:", data);
            } else {
                alert("Registration Failed: " + data.message);
            }
        } catch (err) {
            console.error("Network Error:", err);
            alert("Server se connect nahi ho pa raha. Kya backend chalu hai?");
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