const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./authRoutes');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

// Load env variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Allow larger body size for image uploads
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// CORS configuration
app.use(cors({
    origin: '*', // For development. In production, replace '*' with your frontend URL like "http://localhost:3000"
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files (e.g., uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Auth API Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});



