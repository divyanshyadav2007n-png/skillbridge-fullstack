import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Router hata diya
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;