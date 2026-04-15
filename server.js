const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS for Vercel
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// MongoDB Connection with Error Handling
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected: skillbridge"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

// Main Route to test deployment
app.get("/", (req, res) => {
    res.status(200).send("Skillbridge Backend is officially LIVE! 🚀");
});

// Authentication Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Vercel handles the port automatically
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});