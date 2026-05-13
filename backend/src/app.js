const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            process.env.FRONTEND_URL
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Middleware to read JSON
app.use(express.json());

// Routes
app.use('/api/health', require('./routes/health'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

module.exports = app;