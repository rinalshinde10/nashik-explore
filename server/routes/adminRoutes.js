import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// =====================================
// ADMIN ACCESS CHECK
// =====================================

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Admin dashboard access granted",
            admin: {
                id: req.user.id,
                role: req.user.role
            }
        });

    }
);


export default router;