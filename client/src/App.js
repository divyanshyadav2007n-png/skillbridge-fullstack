import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // Ye naya import hai
import CompanyDashboard from './components/CompanyDashboard';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* Login ke baad user yahan aayega */}
     <Route 
    path="/dashboard" 
    element={
        JSON.parse(localStorage.getItem('user'))?.role?.toLowerCase() === 'employer' 
        ? <CompanyDashboard /> 
        : <Dashboard />
    } 
/>
    </Routes>
  );
}

export default App;