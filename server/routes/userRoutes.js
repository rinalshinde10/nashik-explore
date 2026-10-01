import express from "express";

import {
    getMyProfile,
    updateMyProfile
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


// =====================================
// GET MY PROFILE
// =====================================

router.get(
    "/profile",
    authMiddleware,
    getMyProfile
);


// =====================================
// UPDATE MY PROFILE
// =====================================

router.put(
    "/profile",
    authMiddleware,
    updateMyProfile
);


export default router;