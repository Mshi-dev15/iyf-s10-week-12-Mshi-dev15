const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: mongoose.connection.readyState === 1 
            ? 'connected' 
            : 'disconnected'
    });
});

module.exports = router;