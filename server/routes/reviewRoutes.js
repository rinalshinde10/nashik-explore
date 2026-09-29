import express from "express";

import {
    createReview,
    getPlaceReviews
} from "../controllers/reviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Create Review - Logged-in User
router.post(
    "/",
    authMiddleware,
    createReview
);


// Get Reviews for a Place
router.get(
    "/place/:placeId",
    getPlaceReviews
);


export default router;