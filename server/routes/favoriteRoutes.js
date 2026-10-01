import express from "express";

import {
    addFavorite,
    getFavorites,
    removeFavorite
} from "../controllers/favoriteController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// =====================================
// GET MY FAVORITES
// =====================================

router.get(
    "/",
    authMiddleware,
    getFavorites
);


// =====================================
// ADD FAVORITE
// =====================================

router.post(
    "/",
    authMiddleware,
    addFavorite
);


// =====================================
// REMOVE FAVORITE
// =====================================

router.delete(
    "/:placeId",
    authMiddleware,
    removeFavorite
);


export default router;