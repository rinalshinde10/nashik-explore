import express from "express";

import {
    addFavorite,
    getFavorites,
    removeFavorite
} from "../controllers/favoriteController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Add Favorite - Logged-in User
router.post(
    "/",
    authMiddleware,
    addFavorite
);


// Get My Favorites - Logged-in User
router.get(
    "/",
    authMiddleware,
    getFavorites
);


// Remove Favorite - Logged-in User
router.delete(
    "/:placeId",
    authMiddleware,
    removeFavorite
);


export default router;