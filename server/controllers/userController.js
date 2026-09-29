import User from "../models/User.js";


// Get My Profile
export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

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


// Update My Profile
export const updateMyProfile = async (req, res) => {
    try {
        const { name, profileImage } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (profileImage !== undefined) {
            user.profileImage = profileImage;
        }

        await user.save();

        const updatedUser = await User.findById(req.user.id)
            .select("-password");

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message
        });
    }
};