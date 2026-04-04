const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middleware (Isse handshake error solve hoga)
app.use(cors({
    origin: ["http://localhost:3000", "https://skillbridge-fullstack.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

// 2. MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas Connected!"))
    .catch((err) => console.log("❌ MongoDB Error:", err));

// 3. Test Route
app.get("/", (req, res) => {
    res.status(200).send("SkillBridge Backend is Live! 🚀");
});

// 4. Auth Routes (Check karo path sahi hai)
const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

// 5. Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Yaad rakho: Backend mein 'export default' bilkul nahi aayega.