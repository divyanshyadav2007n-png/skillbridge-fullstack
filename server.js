const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log("MongoDB Error: ", err));

// Test Route (Ise check karne ke liye)
app.get('/', (req, res) => {
  res.send('Skillbridge Backend is Live and Running! 🚀');
});

// Port configuration for Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});