import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();

// Authentication Routes
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Nashik Explore API is running"
    });
});

// Protected Test Route
app.get("/api/test-protected", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Protected route accessed successfully",
        user: req.user
    });
});

// Server Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});