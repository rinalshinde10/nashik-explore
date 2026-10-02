import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
    {
        // =====================================
        // PLACE NAME
        // =====================================

        name: {
            type: String,
            required: [true, "Place name is required"],
            trim: true,
            minlength: [
                2,
                "Place name must be at least 2 characters"
            ],
            maxlength: [
                100,
                "Place name cannot exceed 100 characters"
            ]
        },


        // =====================================
        // DESCRIPTION
        // =====================================

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            minlength: [
                10,
                "Description must be at least 10 characters"
            ],
            maxlength: [
                1000,
                "Description cannot exceed 1000 characters"
            ]
        },


        // =====================================
        // CATEGORY
        // =====================================

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"]
        },


        // =====================================
        // LOCATION
        // =====================================

        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
            maxlength: [
                200,
                "Location cannot exceed 200 characters"
            ]
        },


        // =====================================
        // ADDRESS
        // =====================================

        address: {
            type: String,
            default: "",
            trim: true,
            maxlength: [
                300,
                "Address cannot exceed 300 characters"
            ]
        },


        // =====================================
        // IMAGES
        // =====================================

        images: {
            type: [String],
            default: []
        },


        // =====================================
        // OPENING TIME
        // =====================================

        openingTime: {
            type: String,
            default: "",
            trim: true
        },


        // =====================================
        // CLOSING TIME
        // =====================================

        closingTime: {
            type: String,
            default: "",
            trim: true
        },


        // =====================================
        // CREATED BY
        // =====================================

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Created by user is required"]
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
// PLACE MODEL
// =====================================

const Place = mongoose.model(
    "Place",
    placeSchema
);

export default Place;