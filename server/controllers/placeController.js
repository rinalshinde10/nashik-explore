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


        if (
            !name?.trim() ||
            !description?.trim() ||
            !category ||
            !location?.trim()
        ) {

            return res.status(400).json({
                success: false,
                message: "Please enter all required fields"
            });

        }


        const place = await Place.create({

            name: name.trim(),

            description: description.trim(),

            category,

            location: location.trim(),

            address: address?.trim() || "",

            images: Array.isArray(images)
                ? images
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
                .populate("createdBy", "name email");


        res.status(201).json({

            success: true,

            message: "Place created successfully",

            place: populatedPlace

        });


    } catch (error) {

        console.error(
            "Create place error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to create place",

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


        // SEARCH BY NAME

        if (search?.trim()) {

            filter.name = {

                $regex: search.trim(),

                $options: "i"

            };

        }


        // FILTER BY CATEGORY

        if (category?.trim()) {

            filter.category = category.trim();

        }


        // FILTER BY LOCATION

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

        const placesWithRating =
            await Promise.all(

                places.map(async (place) => {

                    const reviews =
                        await Review.find({
                            place: place._id
                        });


                    const totalReviews =
                        reviews.length;


                    const averageRating =
                        totalReviews > 0

                            ? reviews.reduce(
                                (sum, review) =>
                                    sum + review.rating,
                                0
                            ) / totalReviews

                            : 0;


                    return {

                        ...place.toObject(),

                        averageRating:
                            Number(
                                averageRating.toFixed(1)
                            ),

                        totalReviews

                    };

                })

            );


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

            message: "Failed to fetch places",

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

                message: "Place name cannot be empty"

            });

        }


        if (
            description !== undefined &&
            !description?.trim()
        ) {

            return res.status(400).json({

                success: false,

                message: "Description cannot be empty"

            });

        }


        if (
            category !== undefined &&
            !category
        ) {

            return res.status(400).json({

                success: false,

                message: "Category is required"

            });

        }


        if (
            location !== undefined &&
            !location?.trim()
        ) {

            return res.status(400).json({

                success: false,

                message: "Location cannot be empty"

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
                    ? images
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

                message: "Place not found"

            });

        }


        res.status(200).json({

            success: true,

            message: "Place updated successfully",

            place: updatedPlace

        });


    } catch (error) {

        console.error(
            "Update place error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to update place",

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


        const deletedPlace =
            await Place.findByIdAndDelete(id);


        if (!deletedPlace) {

            return res.status(404).json({

                success: false,

                message: "Place not found"

            });

        }


        // =====================================
        // DELETE RELATED REVIEWS
        // =====================================

        await Review.deleteMany({

            place: id

        });


        res.status(200).json({

            success: true,

            message: "Place deleted successfully"

        });


    } catch (error) {

        console.error(
            "Delete place error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to delete place",

            error: error.message

        });

    }

};