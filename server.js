const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. CORS Middleware (Frontend-Backend connectivity fix)
app.use(cors({
    origin: "*", // Kal ke demo ke liye sabse safe, saare origins allow karega
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); // JSON data handle karne ke liye

// 2. MongoDB Connection (Vercel environment variable se link)
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ Error: MONGO_URI is not defined in Environment Variables!");
}

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
    });

// 3. Basic Test Route (Check karne ke liye ki backend live hai)
app.get("/", (req, res) => {
    res.status(200).send("Internship Hub Backend is Live! 🚀");
});

// 4. Auth Routes (Login/Register)
// Ensure karo ki aapke routes folder mein auth.js file sahi jagah hai
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 5. Port Setup (Vercel automatically handle karta hai)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});