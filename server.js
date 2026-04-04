const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(cors()); 
app.use(express.json());

// 2. MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas Connected!"))
    .catch((err) => console.log("❌ MongoDB Error:", err));

// 3. Routes
app.get("/", (req, res) => res.send("Server is Running! 🚀"));

const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));