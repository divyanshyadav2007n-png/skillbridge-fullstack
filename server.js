const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. CORS Middleware (CORS Error Fix karne ke liye)
app.use(cors({
    origin: '*', // Sabhi origins allow honge taaki localhost se Vercel connect ho sake
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // JSON data handle karne ke liye

// 2. MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas Connected (Internship Hub)"))
    .catch(err => console.log("❌ MongoDB Error:", err));

// 3. Basic Test Route
app.get("/", (req, res) => {
    res.status(200).send("Internship Hub Backend is Live! 🚀");
});

// 4. Auth Routes (Login/Register)
const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

// 5. Port Setup for Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app; 