const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(express.json());

// CORS Setup
app.use(cors({
    origin: ["http://localhost:3000", "https://skillbridge-fullstack.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// 2. MongoDB Connection (Ab sirf ek baar)
const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Atlas Connected!"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    // process.exit(1); 
  });

// 3. Routes
app.get('/', (req, res) => {
    res.send("SkillBridge Backend is Running! 🚀");
});

// Aapke API routes yahan aayenge
// const authRoutes = require('./routes/auth'); // Example
// app.use('/api/auth', authRoutes);

// 4. Port Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});

module.exports = app;