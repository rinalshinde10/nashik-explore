
import axios from "axios";


// =====================================
// API URL
// =====================================

const API_URL = "https://nashik-explore-api.onrender.com/api/favorites";


// =====================================
// AUTH HEADERS
// =====================================

const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    if (!token) {

        throw new Error(
            "Please login to use favorites."
        );

    }

    return {
        Authorization: `Bearer ${token}`
    };

};


// =====================================
// GET MY FAVORITES
// =====================================

export const getFavorites = async () => {

    try {

        const response = await axios.get(
            API_URL,
            {
                headers: getAuthHeaders()
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Get favorites error:",
            error
        );

        throw new Error(
            error.response?.data?.message ||
            "Unable to load favorites."
        );

    }

};


// =====================================
// ADD FAVORITE
// =====================================

export const addFavorite = async (placeId) => {

    try {

        if (!placeId) {

            throw new Error(
                "Place ID is required."
            );

        }


        const response = await axios.post(

            API_URL,

            {
                place: placeId
            },

            {
                headers: getAuthHeaders()
            }

        );


        return response.data;

    } catch (error) {

        console.error(
            "Add favorite error:",
            error
        );


        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Unable to add favorite."
        );

    }

};


// =====================================
// REMOVE FAVORITE
// =====================================

export const removeFavorite = async (placeId) => {

    try {

        if (!placeId) {

            throw new Error(
                "Place ID is required."
            );

        }


        const response = await axios.delete(

            `${API_URL}/${placeId}`,

            {
                headers: getAuthHeaders()
            }

        );


        return response.data;

    } catch (error) {

        console.error(
            "Remove favorite error:",
            error
        );


        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Unable to remove favorite."
        );

    }

};


// =====================================
// CHECK LOGIN STATUS
// =====================================

export const isUserLoggedIn = () => {

    return !!localStorage.getItem("token");

};


// =====================================
// LOGOUT / CLEAR AUTH DATA
// =====================================

export const clearFavoriteAuth = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

};

