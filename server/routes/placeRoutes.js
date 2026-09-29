import express from "express";

import {
    createPlace,
    getPlaces,
    updatePlace,
    deletePlace
} from "../controllers/placeController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// Get all places
router.get("/", getPlaces);


// Create new place - Admin only
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createPlace
);


// Update place - Admin only
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updatePlace
);


// Delete place - Admin only
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deletePlace
);


export default router;