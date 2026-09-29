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