const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. CORS Middleware (Sabse upar hona chahiye)
// Isse aapka localhost:3000 wala CORS error solve hoga
app.use(cors({
    origin: ["http://localhost:3000", "https://skillbridge-fullstack.vercel.app"],
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true
}));

app.use(express.json()); // JSON data handle karne ke liye

// 2. MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err));

// 3. Basic Test Route
app.get("/", (req, res) => {
    res.status(200).send("Internship Hub Backend is Live! 🚀");
});

// 4. Auth Routes
const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

// 5. Port Setup & Export for Vercel
const PORT = process.env.PORT || 5000;

// Vercel serverless environment mein app.listen ki hamesha zaroorat nahi hoti, 
// par local development ke liye ye block help karega.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

module.exports = app; // Ye line Vercel deployment ke liye sabse zaroori hai