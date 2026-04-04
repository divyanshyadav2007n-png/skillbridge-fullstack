const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "https://skillbridge-fullstack.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err));

// Routes
app.get("/", (req, res) => {
    res.status(200).send("SkillBridge Backend is Live! 🚀");
});

// Auth Routes (Ensure the path is correct)
const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

// Export for Vercel
module.exports = app;

// Local Testing
if (process.env.NODE_ENV !== 'production') {
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}