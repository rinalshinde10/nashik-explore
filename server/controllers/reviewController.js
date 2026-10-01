import Review from "../models/Review.js";
import Place from "../models/Place.js";


// =====================================
// CREATE OR UPDATE REVIEW
// =====================================

export const createReview = async (req, res) => {

    try {

        const {
            place,
            rating,
            comment
        } = req.body;


        // ================================
        // VALIDATION
        // ================================

        if (!place || !rating) {

            return res.status(400).json({
                success: false,
                message: "Please provide place and rating"
            });

        }


        if (rating < 1 || rating > 5) {

            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });

        }


        if (
            comment !== undefined &&
            comment.trim().length > 500
        ) {

            return res.status(400).json({
                success: false,
                message: "Review cannot exceed 500 characters"
            });

        }


        // ================================
        // CHECK PLACE
        // ================================

        const existingPlace =
            await Place.findById(place);


        if (!existingPlace) {

            return res.status(404).json({
                success: false,
                message: "Place not found"
            });

        }


        // ================================
        // CHECK EXISTING REVIEW
        // ================================

        const existingReview =
            await Review.findOne({
                user: req.user.id,
                place
            });


        let review;


        // ================================
        // UPDATE EXISTING REVIEW
        // ================================

        if (existingReview) {

            existingReview.rating = rating;


            if (comment !== undefined) {

                existingReview.comment =
                    comment.trim();

            }


            await existingReview.save();

            review = existingReview;

        }


        // ================================
        // CREATE NEW REVIEW
        // ================================

        else {

            review = await Review.create({

                user: req.user.id,

                place,

                rating,

                comment:
                    comment?.trim() || ""

            });

        }


        // ================================
        // RESPONSE
        // ================================

        res.status(200).json({

            success: true,

            message: existingReview
                ? "Review updated successfully"
                : "Review added successfully",

            review

        });

    } catch (error) {

        console.error(
            "Create review error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to save review",

            error: error.message

        });

    }

};



// =====================================
// GET REVIEWS FOR PLACE
// =====================================

export const getPlaceReviews = async (
    req,
    res
) => {

    try {

        const { placeId } = req.params;


        const reviews =
            await Review.find({
                place: placeId
            })
                .populate(
                    "user",
                    "name"
                )
                .sort({
                    createdAt: -1
                });


        res.status(200).json({

            success: true,

            count: reviews.length,

            reviews

        });

    } catch (error) {

        console.error(
            "Get reviews error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to fetch reviews",

            error: error.message

        });

    }

};



// =====================================
// UPDATE OWN REVIEW
// =====================================

export const updateReview = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        const {
            rating,
            comment
        } = req.body;


        const review =
            await Review.findById(id);


        if (!review) {

            return res.status(404).json({

                success: false,

                message: "Review not found"

            });

        }


        // ================================
        // CHECK OWNER
        // ================================

        if (
            review.user.toString() !==
            req.user.id
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You can update only your own review"

            });

        }


        // ================================
        // UPDATE RATING
        // ================================

        if (rating !== undefined) {

            if (
                rating < 1 ||
                rating > 5
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Rating must be between 1 and 5"

                });

            }


            review.rating = rating;

        }


        // ================================
        // UPDATE COMMENT
        // ================================

        if (comment !== undefined) {

            if (
                comment.trim().length > 500
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Review cannot exceed 500 characters"

                });

            }


            review.comment =
                comment.trim();

        }


        await review.save();


        res.status(200).json({

            success: true,

            message:
                "Review updated successfully",

            review

        });

    } catch (error) {

        console.error(
            "Update review error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to update review",

            error: error.message

        });

    }

};



// =====================================
// DELETE OWN REVIEW
// =====================================

export const deleteReview = async (
    req,
    res
) => {

    try {

        const { id } = req.params;


        const review =
            await Review.findById(id);


        if (!review) {

            return res.status(404).json({

                success: false,

                message: "Review not found"

            });

        }


        // ================================
        // CHECK OWNER
        // ================================

        if (
            review.user.toString() !==
            req.user.id
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You can delete only your own review"

            });

        }


        await Review.findByIdAndDelete(id);


        res.status(200).json({

            success: true,

            message:
                "Review deleted successfully"

        });

    } catch (error) {

        console.error(
            "Delete review error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to delete review",

            error: error.message

        });

    }

};