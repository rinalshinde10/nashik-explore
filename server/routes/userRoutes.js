import express from "express";

import {
    getMyProfile,
    updateMyProfile
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Get My Profile
router.get(
    "/profile",
    authMiddleware,
    getMyProfile
);


// Update My Profile
router.put(
    "/profile",
    authMiddleware,
    updateMyProfile
);


export default router;