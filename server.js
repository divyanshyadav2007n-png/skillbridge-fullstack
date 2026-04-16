const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Apne Auth Routes ko yahan import karo (Check karo ki file path sahi hai)
const authRoutes = require('./routes/auth'); 

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "https://skillbridge-fullstack-1e2v16mtp.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log("MongoDB Error: ", err));

// 2. Routes ka istemal yahan karo
// Ye line frontend ki request ko sahi jagah bhejegi
app.use('/api/auth', authRoutes); 

// Test Route
app.get('/', (req, res) => {
  res.send('Skillbridge Backend is Live and Running! 🚀');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});