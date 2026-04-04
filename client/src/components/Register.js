import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', role: 'Student', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            alert("🎉 Registration Successful!");
            console.log("Success:", data);
        } catch (err) {
            alert("❌ Server se connect nahi ho pa raha.");
        }
    };

    return (
        // Aapka existing design yahan rahega...
        <form onSubmit={handleSubmit}>
             {/* Inputs for name, email, role, password */}
             <button type="submit">Register</button>
        </form>
    );
};

export default Register;