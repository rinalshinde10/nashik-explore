import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";


dotenv.config();

const app = express();


// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());


// =====================================
// DATABASE CONNECTION
// =====================================

connectDB();


// =====================================
// API ROUTES
// =====================================

// Authentication
app.use(
    "/api/auth",
    authRoutes
);


// Categories
app.use(
    "/api/categories",
    categoryRoutes
);


// Places
app.use(
    "/api/places",
    placeRoutes
);


// Reviews
app.use(
    "/api/reviews",
    reviewRoutes
);


// Favorites
app.use(
    "/api/favorites",
    favoriteRoutes
);


// Users / Profile
app.use(
    "/api/users",
    userRoutes
);


// Admin
app.use(
    "/api/admin",
    adminRoutes
);


// =====================================
// HOME ROUTE
// =====================================

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Nashik Explore API is running"

    });

});


// =====================================
// ERROR HANDLER
// =====================================

// Keep this AFTER all routes
app.use(errorMiddleware);


// =====================================
// SERVER
// =====================================

const PORT =
    process.env.PORT || 8080;


app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});