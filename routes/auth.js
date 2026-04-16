const express = require('express');
const router = express.Router();
router.post('/register', (req, res) => res.json({ msg: "Working" }));
router.post('/login', (req, res) => res.json({ msg: "Working" }));
module.exports = router;