import Place from "../models/Place.js";

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


export const getPlaces = async (req, res) => {
    try {
        const places = await Place.find()
            .populate("category", "name")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: places.length,
            places
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch places",
            error: error.message
        });
    }
};