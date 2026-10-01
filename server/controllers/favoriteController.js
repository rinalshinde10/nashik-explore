import Favorite from "../models/Favorite.js";
import Place from "../models/Place.js";


// =====================================
// ADD FAVORITE
// =====================================

export const addFavorite = async (req, res) => {
    try {

        const { place } = req.body;


        // Check place ID
        if (!place) {

            return res.status(400).json({
                success: false,
                message: "Place is required"
            });

        }


        // Check whether place exists
        const existingPlace =
            await Place.findById(place);

        if (!existingPlace) {

            return res.status(404).json({
                success: false,
                message: "Place not found"
            });

        }


        // Check duplicate favorite
        const existingFavorite =
            await Favorite.findOne({
                user: req.user.id,
                place: place
            });

        if (existingFavorite) {

            return res.status(400).json({
                success: false,
                message: "Place already added to favorites"
            });

        }


        // Create favorite
        const favorite =
            await Favorite.create({
                user: req.user.id,
                place: place
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



// =====================================
// GET MY FAVORITES
// =====================================

export const getFavorites = async (req, res) => {

    try {

        const favorites =
            await Favorite.find({
                user: req.user.id
            })
                .populate(
                    "place",
                    "name description location address images openingTime closingTime"
                )
                .sort({
                    createdAt: -1
                });


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



// =====================================
// REMOVE FAVORITE
// =====================================

export const removeFavorite = async (req, res) => {

    try {

        const { placeId } = req.params;


        if (!placeId) {

            return res.status(400).json({

                success: false,

                message: "Place ID is required"

            });

        }


        const favorite =
            await Favorite.findOneAndDelete({

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