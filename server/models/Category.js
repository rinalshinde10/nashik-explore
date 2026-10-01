import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        // =====================================
        // CATEGORY NAME
        // =====================================

        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true,
            minlength: [
                2,
                "Category name must be at least 2 characters"
            ],
            maxlength: [
                50,
                "Category name cannot exceed 50 characters"
            ]
        },


        // =====================================
        // DESCRIPTION
        // =====================================

        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: [
                300,
                "Description cannot exceed 300 characters"
            ]
        },


        // =====================================
        // CATEGORY IMAGE
        // =====================================

        image: {
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
// CATEGORY MODEL
// =====================================

const Category = mongoose.model(
    "Category",
    categorySchema
);

export default Category;