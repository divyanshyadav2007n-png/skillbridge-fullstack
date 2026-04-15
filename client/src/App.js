import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // Layer 2
import CompanyDashboard from './components/CompanyDashboard'; // Layer 3
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content-layer">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/job/:id" element={<CompanyDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;