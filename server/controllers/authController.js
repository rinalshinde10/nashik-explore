import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// =====================================
// REGISTER USER
// =====================================

export const registerUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Validate required fields
        if (
            !name?.trim() ||
            !email?.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Please enter all required fields"
            });
        }


        // Validate password
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }


        const normalizedEmail =
            email.trim().toLowerCase();


        // Check existing user
        const existingUser =
            await User.findOne({
                email: normalizedEmail
            });


        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create user
        const user = await User.create({

            name: name.trim(),

            email: normalizedEmail,

            password: hashedPassword

        });


        res.status(201).json({

            success: true,

            message: "User registered successfully",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });


    } catch (error) {

        console.error(
            "Register error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Registration failed",

            error: error.message

        });

    }
};



// =====================================
// LOGIN USER
// =====================================

export const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Validate fields
        if (
            !email?.trim() ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter email and password"

            });

        }


        const normalizedEmail =
            email.trim().toLowerCase();


        // Find user
        const user =
            await User.findOne({
                email: normalizedEmail
            });


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // Compare password
        const isPasswordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isPasswordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // Check JWT secret
        if (!process.env.JWT_SECRET) {

            return res.status(500).json({

                success: false,

                message:
                    "JWT secret is not configured"

            });

        }


        // Generate JWT
        const token = jwt.sign(

            {
                id: user._id.toString(),

                role: user.role

            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        // Login response
        res.status(200).json({

            success: true,

            message:
                "Login successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Login failed",

            error: error.message

        });

    }

};