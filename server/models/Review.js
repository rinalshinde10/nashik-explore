import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema(

    {
        // ================================
        // USER
        // ================================

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // ================================
        // PLACE
        // ================================

        place: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Place",

            required: true

        },


        // ================================
        // RATING
        // ================================

        rating: {

            type: Number,

            required: true,

            min: 1,

            max: 5

        },


        // ================================
        // COMMENT
        // ================================

        comment: {

            type: String,

            default: "",

            trim: true,

            maxlength: 500

        }

    },


    {
        timestamps: true
    }

);


// =====================================
// ONE REVIEW PER USER PER PLACE
// =====================================

reviewSchema.index(
    {
        user: 1,
        place: 1
    },
    {
        unique: true
    }
);


const Review =
    mongoose.model(
        "Review",
        reviewSchema
    );


export default Review;