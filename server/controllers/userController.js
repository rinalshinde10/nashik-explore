import User from "../models/User.js";


// =====================================
// GET MY PROFILE
// =====================================

export const getMyProfile = async (req, res) => {

    try {

        const user = await User.findById(
            req.user.id
        ).select("-password");


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        res.status(200).json({

            success: true,

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Failed to fetch profile",

            error: error.message

        });

    }

};


// =====================================
// UPDATE MY PROFILE
// =====================================

export const updateMyProfile = async (req, res) => {

    try {

        const {
            name,
            profileImage
        } = req.body;


        const user = await User.findById(
            req.user.id
        );


        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }


        // =================================
        // UPDATE NAME
        // =================================

        if (name !== undefined) {

            const trimmedName =
                name.trim();


            if (!trimmedName) {

                return res.status(400).json({

                    success: false,

                    message: "Name cannot be empty"

                });

            }


            user.name = trimmedName;

        }


        // =================================
        // UPDATE PROFILE IMAGE
        // =================================

        if (profileImage !== undefined) {

            user.profileImage =
                profileImage;

        }


        await user.save();


        // =================================
        // GET UPDATED USER
        // =================================

        const updatedUser =
            await User.findById(
                req.user.id
            ).select("-password");


        res.status(200).json({

            success: true,

            message:
                "Profile updated successfully",

            user: updatedUser

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to update profile",

            error: error.message

        });

    }

};