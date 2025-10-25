const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Route: POST /api/users/signup
// Desc: Register a new user
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findone({ email });

        if (user) {
            return res.status(400).json({ success: false, error: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        user = await User.create({
            username,
            email,
            password: hashPass,
            data: { userId: user._id, username: user.username },
        });

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: { userId: user._id, username: user.username },
        });

    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({Result: error.message});z
    }
});

// Route: POST /api/users/login
// Desc: Register a new user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

    }
    catch(error){
        console.error('Error:', error);
        res.status(500).json({Result: error.message});
    }
});