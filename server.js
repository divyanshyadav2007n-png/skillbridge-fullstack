const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(cors({
    origin: ["http://localhost:3000", "https://skillbridge-fullstack.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));
app.use(express.json());

// 2. MongoDB Connection Logic
const mongoURI = process.env.MONGO_URI;
if (mongoURI) {
    mongoose.connect(mongoURI)
        .then(() => console.log("✅ MongoDB Connected"))
        .catch(err => console.log("❌ MongoDB Error:", err));
}

// 3. Routes
app.get("/", (req, res) => {
    res.status(200).send("SkillBridge Backend is Live! 🚀");
});

const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

// 4. Export for Vercel
module.exports = app;

// Local testing ke liye (Optional)
if (process.env.NODE_ENV !== 'production') {
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}