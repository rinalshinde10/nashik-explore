import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // =====================================
        // NAME
        // =====================================

        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"]
        },


        // =====================================
        // EMAIL
        // =====================================

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,

            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        },


        // =====================================
        // PASSWORD
        // =====================================

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [
                6,
                "Password must be at least 6 characters"
            ]
        },


        // =====================================
        // USER ROLE
        // =====================================

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },


        // =====================================
        // PROFILE IMAGE
        // =====================================

        profileImage: {
            type: String,
            default: "",
            trim: true
        }
    },


    // =====================================
    // TIMESTAMPS
    // =====================================

    {
        timestamps: true
    }
);


// =====================================
// USER MODEL
// =====================================

const User = mongoose.model(
    "User",
    userSchema
);

export default User;