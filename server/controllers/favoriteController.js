import Favorite from "../models/Favorite.js";
import Place from "../models/Place.js";


// Add Favorite
export const addFavorite = async (req, res) => {
    try {
        const { place } = req.body;

        if (!place) {
            return res.status(400).json({
                success: false,
                message: "Place is required"
            });
        }

        const existingPlace = await Place.findById(place);

        if (!existingPlace) {
            return res.status(404).json({
                success: false,
                message: "Place not found"
            });
        }

        const existingFavorite = await Favorite.findOne({
            user: req.user.id,
            place
        });

        if (existingFavorite) {
            return res.status(400).json({
                success: false,
                message: "Place already added to favorites"
            });
        }

        const favorite = await Favorite.create({
            user: req.user.id,
            place
        });

        res.status(201).json({
            success: true,
            message: "Place added to favorites",
            favorite
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add favorite",
            error: error.message
        });
    }
};


// Get My Favorites
export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({
            user: req.user.id
        })
            .populate("place")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: favorites.length,
            favorites
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch favorites",
            error: error.message
        });
    }
};


// Remove Favorite
export const removeFavorite = async (req, res) => {
    try {
        const { placeId } = req.params;

        const favorite = await Favorite.findOneAndDelete({
            user: req.user.id,
            place: placeId
        });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Favorite not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Place removed from favorites"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to remove favorite",
            error: error.message
        });
    }
};