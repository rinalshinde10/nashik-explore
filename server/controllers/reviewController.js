import Review from "../models/Review.js";
import Place from "../models/Place.js";


// Create or Update Rating
export const createReview = async (req, res) => {
    try {
        const { place, rating } = req.body;

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

        const existingPlace = await Place.findById(place);

        if (!existingPlace) {
            return res.status(404).json({
                success: false,
                message: "Place not found"
            });
        }

        // Check if user already rated this place
        const existingReview = await Review.findOne({
            user: req.user.id,
            place
        });

        let review;

        if (existingReview) {

            existingReview.rating = rating;

            await existingReview.save();

            review = existingReview;

        } else {

            review = await Review.create({
                user: req.user.id,
                place,
                rating,
                comment: ""
            });

        }

        res.status(200).json({
            success: true,
            message: "Rating saved successfully",
            review
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to save rating",
            error: error.message
        });

    }
};


// Get Reviews for a Place
export const getPlaceReviews = async (req, res) => {
    try {

        const { placeId } = req.params;

        const reviews = await Review.find({
            place: placeId
        })
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
        const { rating } = req.body;

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

            if (rating < 1 || rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: "Rating must be between 1 and 5"
                });
            }

            review.rating = rating;
        }

        await review.save();

        res.status(200).json({
            success: true,
            message: "Rating updated successfully",
            review
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to update rating",
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
            message: "Rating deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete rating",
            error: error.message
        });

    }
};