const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
    signup,
    login,
    getProfile,
    deleteProfile,
    updateProfile,
} = require('./authController');

// ============= Multer Config =============
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// ============= Routes =============

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Get Profile
router.get('/profile', getProfile);

// Update Profile with image
router.put('/profile', upload.single('image'), updateProfile);

// Delete Profile
router.delete('/profile', deleteProfile);

// Get all users
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                age: true,
                gender: true,
                image: true,
            }
        });
        res.json(users);
    } catch (error) {
        console.error("Fetch users error:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});

module.exports = router;









