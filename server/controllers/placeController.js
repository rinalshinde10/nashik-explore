import mongoose from "mongoose";

import Place from "../models/Place.js";
import Review from "../models/Review.js";


// =====================================
// CREATE PLACE
// =====================================

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


        // Required fields
        if (
            !name?.trim() ||
            !description?.trim() ||
            !category ||
            !location?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Please enter all required fields"
            });
        }


        // Validate category ID
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            });
        }


        const place = await Place.create({
            name: name.trim(),
            description: description.trim(),
            category,
            location: location.trim(),
            address: address?.trim() || "",
            images: Array.isArray(images)
                ? images.filter(
                    (image) =>
                        typeof image === "string" &&
                        image.trim()
                )
                : [],
            openingTime:
                openingTime?.trim() || "",
            closingTime:
                closingTime?.trim() || "",
            createdBy: req.user.id
        });


        const populatedPlace =
            await Place.findById(place._id)
                .populate("category", "name")
                .populate(
                    "createdBy",
                    "name email"
                );


        res.status(201).json({
            success: true,
            message:
                "Place created successfully",
            place: populatedPlace
        });


    } catch (error) {
        console.error(
            "Create place error:",
            error
        );


        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message:
                    Object.values(error.errors)
                        .map(
                            (item) => item.message
                        )
                        .join(", ")
            });
        }


        res.status(500).json({
            success: false,
            message:
                "Failed to create place",
            error: error.message
        });
    }
};


// =====================================
// GET ALL PLACES
// SEARCH + CATEGORY + LOCATION
// =====================================

export const getPlaces = async (req, res) => {
    try {
        const {
            search,
            category,
            location
        } = req.query;


        const filter = {};


        // Search by name
        if (search?.trim()) {
            filter.name = {
                $regex: search.trim(),
                $options: "i"
            };
        }


        // Filter by category
        if (category?.trim()) {

            if (
                !mongoose.Types.ObjectId.isValid(
                    category.trim()
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category ID"
                });
            }


            filter.category =
                category.trim();
        }


        // Filter by location
        if (location?.trim()) {
            filter.location = {
                $regex: location.trim(),
                $options: "i"
            };
        }


        const places =
            await Place.find(filter)
                .populate(
                    "category",
                    "name"
                )
                .populate(
                    "createdBy",
                    "name email"
                )
                .sort({
                    createdAt: -1
                });


        // =====================================
        // CALCULATE RATINGS
        // =====================================

        const placeIds =
            places.map(
                (place) => place._id
            );


        const reviews =
            await Review.find({
                place: {
                    $in: placeIds
                }
            }).select(
                "place rating"
            );


        // Group ratings by place
        const ratingMap = {};


        reviews.forEach((review) => {

            const placeId =
                review.place.toString();


            if (!ratingMap[placeId]) {
                ratingMap[placeId] = {
                    totalReviews: 0,
                    totalRating: 0
                };
            }


            ratingMap[placeId]
                .totalReviews += 1;


            ratingMap[placeId]
                .totalRating += review.rating;

        });


        const placesWithRating =
            places.map((place) => {

                const placeId =
                    place._id.toString();


                const ratingData =
                    ratingMap[placeId] || {
                        totalReviews: 0,
                        totalRating: 0
                    };


                const averageRating =
                    ratingData.totalReviews > 0
                        ? ratingData.totalRating /
                        ratingData.totalReviews
                        : 0;


                return {
                    ...place.toObject(),

                    averageRating:
                        Number(
                            averageRating.toFixed(1)
                        ),

                    totalReviews:
                        ratingData.totalReviews
                };

            });


        res.status(200).json({
            success: true,
            count:
                placesWithRating.length,
            places:
                placesWithRating
        });


    } catch (error) {
        console.error(
            "Get places error:",
            error
        );


        res.status(500).json({
            success: false,
            message:
                "Failed to fetch places",
            error: error.message
        });
    }
};


// =====================================
// UPDATE PLACE
// =====================================

export const updatePlace = async (req, res) => {
    try {
        const { id } = req.params;


        // Validate place ID
        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid place ID"
            });
        }


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


        // =====================================
        // VALIDATION
        // =====================================

        if (
            name !== undefined &&
            !name?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Place name cannot be empty"
            });
        }


        if (
            description !== undefined &&
            !description?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Description cannot be empty"
            });
        }


        if (
            category !== undefined &&
            !category
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Category is required"
            });
        }


        if (
            category !== undefined &&
            !mongoose.Types.ObjectId.isValid(
                category
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid category ID"
            });
        }


        if (
            location !== undefined &&
            !location?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Location cannot be empty"
            });
        }


        // =====================================
        // SAFE UPDATE OBJECT
        // =====================================

        const updateData = {};


        if (name !== undefined) {
            updateData.name =
                name.trim();
        }


        if (description !== undefined) {
            updateData.description =
                description.trim();
        }


        if (category !== undefined) {
            updateData.category =
                category;
        }


        if (location !== undefined) {
            updateData.location =
                location.trim();
        }


        if (address !== undefined) {
            updateData.address =
                address?.trim() || "";
        }


        if (images !== undefined) {
            updateData.images =
                Array.isArray(images)
                    ? images.filter(
                        (image) =>
                            typeof image ===
                                "string" &&
                            image.trim()
                    )
                    : [];
        }


        if (openingTime !== undefined) {
            updateData.openingTime =
                openingTime?.trim() || "";
        }


        if (closingTime !== undefined) {
            updateData.closingTime =
                closingTime?.trim() || "";
        }


        const updatedPlace =
            await Place.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            )
                .populate(
                    "category",
                    "name"
                )
                .populate(
                    "createdBy",
                    "name email"
                );


        if (!updatedPlace) {
            return res.status(404).json({
                success: false,
                message:
                    "Place not found"
            });
        }


        res.status(200).json({
            success: true,
            message:
                "Place updated successfully",
            place: updatedPlace
        });


    } catch (error) {
        console.error(
            "Update place error:",
            error
        );


        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message:
                    Object.values(error.errors)
                        .map(
                            (item) => item.message
                        )
                        .join(", ")
            });
        }


        res.status(500).json({
            success: false,
            message:
                "Failed to update place",
            error: error.message
        });
    }
};


// =====================================
// DELETE PLACE
// =====================================

export const deletePlace = async (req, res) => {
    try {
        const { id } = req.params;


        // Validate place ID
        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid place ID"
            });
        }


        const deletedPlace =
            await Place.findByIdAndDelete(id);


        if (!deletedPlace) {
            return res.status(404).json({
                success: false,
                message:
                    "Place not found"
            });
        }


        // Delete related reviews
        await Review.deleteMany({
            place: id
        });


        res.status(200).json({
            success: true,
            message:
                "Place deleted successfully"
        });


    } catch (error) {
        console.error(
            "Delete place error:",
            error
        );


        res.status(500).json({
            success: false,
            message:
                "Failed to delete place",
            error: error.message
        });
    }
};