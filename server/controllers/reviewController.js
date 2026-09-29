import Review from "../models/Review.js";
import Place from "../models/Place.js";


// Create Review
export const createReview = async (req, res) => {
    try {
        const { place, rating, comment } = req.body;

        if (!place || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: "Please enter place, rating and comment"
            });
        }

        const existingPlace = await Place.findById(place);

        if (!existingPlace) {
            return res.status(404).json({
                success: false,
                message: "Place not found"
            });
        }

        const review = await Review.create({
            user: req.user.id,
            place,
            rating,
            comment
        });

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add review",
            error: error.message
        });
    }
};


// Get Reviews for a Place
export const getPlaceReviews = async (req, res) => {
    try {
        const { placeId } = req.params;

        const reviews = await Review.find({ place: placeId })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch reviews",
            error: error.message
        });
    }
};


// Update Review
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can update only your own review"
            });
        }

        if (rating !== undefined) {
            review.rating = rating;
        }

        if (comment !== undefined) {
            review.comment = comment;
        }

        await review.save();

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update review",
            error: error.message
        });
    }
};


// Delete Review
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can delete only your own review"
            });
        }

        await Review.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete review",
            error: error.message
        });
    }
};