const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(express.json());

// CORS Setup: Isse "Server se connect nahi ho pa raha" error solve hoga
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// 2. MongoDB Connection
const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Atlas Connected!"))
  .catch((err) => console.error("❌ Connection Error:", err));
  
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Atlas Connected!"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    // process.exit(1); // Is line ko comment kar do taaki server turant band na ho
  });

// 3. Routes
app.get('/', (req, res) => {
    res.send("SkillBridge Backend is Running! 🚀");
});

// Aapke API routes yahan aayenge (Example)
// app.use('/api', require('./routes/apiRoutes'));

// 4. Port Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});

module.exports = app;