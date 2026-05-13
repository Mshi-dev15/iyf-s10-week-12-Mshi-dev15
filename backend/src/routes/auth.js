const express = require('express');
console.log('✅ auth.js file loaded');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// 👇 ADD THIS MIDDLEWARE RIGHT HERE (after router creation) 👇
router.use((req, res, next) => {
    console.log('🔍 Route hit:', req.method, req.path);
    next();
});

// Helper to generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        console.log('📥 Register body:', req.body);
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Create new user
        const user = await User.create({ name, email, password });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({ token, user });

    } catch (error) {
        console.error('❌ Register error:', error); // 👈 Also add this to see the real error
        res.status(500).json({ error: error.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({ token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/auth/me  (protected)
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;