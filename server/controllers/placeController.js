import Place from "../models/Place.js";
import Review from "../models/Review.js";


// Create Place
export const createPlace = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            location,
            address,
            images,
            openingTime,
            closingTime
        } = req.body;

        if (!name || !description || !category || !location) {
            return res.status(400).json({
                success: false,
                message: "Please enter all required fields"
            });
        }

        const place = await Place.create({
            name,
            description,
            category,
            location,
            address,
            images,
            openingTime,
            closingTime,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Place created successfully",
            place
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create place",
            error: error.message
        });
    }
};


// Get All Places with Search, Filter and Rating
export const getPlaces = async (req, res) => {
    try {
        const { search, category, location } = req.query;

        const filter = {};

        // Search by place name
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Filter by location
        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        const places = await Place.find(filter)
            .populate("category", "name")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        // Calculate average rating and total reviews
        const placesWithRating = await Promise.all(
            places.map(async (place) => {
                const reviews = await Review.find({
                    place: place._id
                });

                const totalReviews = reviews.length;

                const averageRating =
                    totalReviews > 0
                        ? reviews.reduce(
                            (sum, review) => sum + review.rating,
                            0
                        ) / totalReviews
                        : 0;

                return {
                    ...place.toObject(),
                    averageRating: Number(averageRating.toFixed(1)),
                    totalReviews
                };
            })
        );

        res.status(200).json({
            success: true,
            count: placesWithRating.length,
            places: placesWithRating
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch places",
            error: error.message
        });
    }
};


// Update Place
export const updatePlace = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedPlace = await Place.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPlace) {
            return res.status(404).json({
                success: false,
                message: "Place not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Place updated successfully",
            place: updatedPlace
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update place",
            error: error.message
        });
    }
};


// Delete Place
export const deletePlace = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPlace = await Place.findByIdAndDelete(id);

        if (!deletedPlace) {
            return res.status(404).json({
                success: false,
                message: "Place not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Place deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete place",
            error: error.message
        });
    }
};