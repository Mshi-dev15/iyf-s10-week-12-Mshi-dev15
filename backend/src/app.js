const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration - UPDATED
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://convo-app-murex.vercel.app',              // Your custom Vercel URL
            'https://convo-23ny1lsu4-mshi-dev15s-projects.vercel.app',  // Your Vercel preview URL (from error)
            process.env.FRONTEND_URL                            // From Render env var (fallback)
        ].filter(Boolean); // Remove undefined/null values

        // Allow if origin matches any allowed origin OR ends with .vercel.app (for preview deployments)
        if (allowedOrigins.includes(origin) || origin?.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            console.warn(`🚫 CORS blocked: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
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