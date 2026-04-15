const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. CORS Setup
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 2. MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected: skillbridge"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

// 3. Test Route (Live check karne ke liye)
app.get("/", (req, res) => {
    res.status(200).send("Skillbridge Backend is officially LIVE! 🚀");
});

// 4. Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 5. Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});