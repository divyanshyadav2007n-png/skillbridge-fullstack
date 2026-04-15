const express = require('express');
const router = express.Router();

// Temporary Register Route
router.post('/register', (req, res) => {
  res.json({ message: "Register route is working!" });
});

// Temporary Login Route
router.post('/login', (req, res) => {
  res.json({ message: "Login route is working!" });
});

module.exports = router;