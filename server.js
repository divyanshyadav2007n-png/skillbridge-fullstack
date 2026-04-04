const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middleware (CORS settings for Production)
app.use(cors({
    origin: ["http://localhost:3000", "https://skillbridge-fullstack.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

// 2. MongoDB Connection (With Error Handling)
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("❌ MONGO_URI is missing in Environment Variables!");
}

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas Connected!"))
    .catch((err) => console.log("❌ MongoDB Error:", err));

// 3. Test Route
app.get("/", (req, res) => {
    res.status(200).send("SkillBridge Backend is Live! 🚀");
});

// 4. Auth Routes 
const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

// 5. Vercel & Local Port Handling
// Important: Local par chalane ke liye app.listen zaroori hai, 
// par Vercel par module.exports hi kaam karega.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;