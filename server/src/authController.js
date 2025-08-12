const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// ================= Signup =================
const signup = async (req, res) => {
    try {
        const { name, email, password, age, gender } = req.body;

        if (!name || !email || !password || !age || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                age: parseInt(age),
                gender,
            },
        });

        res.status(201).json({
            message: "User created",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                image: user.image || "",
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ================= Login =================
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            image: user.image || "",
        },
    });
};

// ================= Get Profile =================
const getProfile = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Authorization header malformed" });
    }

    const token = tokenParts[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                age: true,
                gender: true,
                image: true,
            },
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Fix: prepend localhost only if image path is relative
        if (user.image && !user.image.startsWith("http")) {
            user.image = `http://localhost:5000${user.image}`;
        }

        res.json(user);
    } catch (err) {
        console.error("Profile fetch error:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// ================= Delete Profile =================
const deleteProfile = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        await prisma.user.delete({ where: { id: userId } });
        res.json({ message: "Account deleted" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Failed to delete" });
    }
};

// ================= Update Profile =================
const updateProfile = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const updateData = {};
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.age) updateData.age = Number(req.body.age);
        if (req.body.gender) updateData.gender = req.body.gender;
        if (req.body.email) updateData.email = req.body.email;

        // 🔹 Cloudinary upload ka need nahi (tum already frontend se upload kar chuki ho)
        // Sirf image ka URL save karo agar frontend ne bheja hai
        if (req.body.image) {
            updateData.image = req.body.image;
        }

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        console.error("Profile update error:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    signup,
    login,
    getProfile,
    deleteProfile,
    updateProfile,
};









