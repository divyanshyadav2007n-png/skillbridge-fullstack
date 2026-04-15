const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. CORS Middleware - Iska order sabse upar hona chahiye
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // JSON data handle karne ke liye

// 2. MongoDB Connection
// Note: MongoDB connect hone ka wait serverless function mein zaroori hai
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

// 5. Port Setup for Local Development
// Vercel app.listen() ko ignore karta hai, par localhost ke liye ye zaroori hai
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

// 6. Export for Vercel (Sabse Important Line)
module.exports = app;