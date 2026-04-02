const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = "mongodb://127.0.0.1:27017/internshipHub";
mongoose.connect(dbURI, {
    family: 4 
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => {
    console.error('❌ Connection Error:', err.message);
    console.log('Tip: Check if your Mobile Hotspot is connected.');
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'Student' },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// 4. Register Route
app.post('/register', async (req, res) => {
    console.log('Incoming Registration:', req.body);
    try {
        const { name, email, role, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Save User
        const newUser = new User({ name, email, role, password });
        await newUser.save();

        res.status(200).json({ message: 'User saved to MongoDB!' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 2. Check password (Direct matching for now)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        // 3. Success
        res.status(200).json({ message: 'Login Successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
app.get('/', (req, res) => res.send('Server is Running!'));
// --- APPLICATION LOGIC ---

// 1. Application Schema (Batata hai ki application mein kya save hoga)
const applicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    internshipTitle: String,
    company: String,
    status: { type: String, default: 'Pending' },
    appliedAt: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', applicationSchema);

// 2. Route: Internship ke liye apply karne ke liye
app.post('/api/apply', async (req, res) => {
    try {
        const { userId, internshipTitle, company } = req.body;
        const newApp = new Application({ userId, internshipTitle, company });
        await newApp.save();
        res.status(201).json({ message: "Applied successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

// 3. Route: User ki saari applications dekhne ke liye
app.get('/api/my-applications/:userId', async (req, res) => {
    try {
        const apps = await Application.find({ userId: req.params.userId });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});
// 4. Route: Company side applications dekhne ke liye
app.get('/api/company-applications/:companyName', async (req, res) => {
    try {
        // Ye specific company name ki saari applications dhoondhega
        const apps = await Application.find({ company: req.params.companyName });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));