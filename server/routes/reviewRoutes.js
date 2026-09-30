import express from "express";

import {
    createReview,
    getPlaceReviews,
    updateReview,
    deleteReview
} from "../controllers/reviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Create Rating
router.post(
    "/",
    authMiddleware,
    createReview
);


// Get Ratings for a Place
router.get(
    "/place/:placeId",
    getPlaceReviews
);


// Update Own Rating
router.put(
    "/:id",
    authMiddleware,
    updateReview
);


// Delete Own Rating
router.delete(
    "/:id",
    authMiddleware,
    deleteReview
);


export default router;