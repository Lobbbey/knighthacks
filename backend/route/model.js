const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const User = require('../models/User');

// Route: POST /api/media/add
// Desc: Add media to database
router.post('/add', async (req, res) => {
    try {
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({Result: error.message});
    }
});

// Route: POST /api/media/delete
// Desc: Remove media to database
router.post('/delete', async (req, res) => {
    try {
        const {} = req.body;
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({Result: error.message});
    }
});

// Route: POST /api/media/search
// Desc: Add media to database
router.post('/search', async (req, res) => {});

// Route: POST /api/media/update
// Desc: update media in the database
router.post('/update', async (req, res) => {});