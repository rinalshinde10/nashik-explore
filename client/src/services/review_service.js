import axios from "axios";

const API_URL = "https://nashik-explore-api.onrender.com/api/reviews";


// =====================================
// GET REVIEWS FOR PLACE
// =====================================

export const getPlaceReviews = async (placeId) => {

    const response = await axios.get(
        `${API_URL}/place/${placeId}`
    );

    return response.data;
};


// =====================================
// CREATE / UPDATE REVIEW
// =====================================

export const createReview = async ({
    place,
    rating,
    comment
}) => {

    const token =
        localStorage.getItem("token");


    const response = await axios.post(
        API_URL,
        {
            place,
            rating,
            comment
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =====================================
// UPDATE OWN REVIEW
// =====================================

export const updateReview = async (
    reviewId,
    {
        rating,
        comment
    }
) => {

    const token =
        localStorage.getItem("token");


    const response = await axios.put(
        `${API_URL}/${reviewId}`,
        {
            rating,
            comment
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =====================================
// DELETE OWN REVIEW
// =====================================

export const deleteReview = async (
    reviewId
) => {

    const token =
        localStorage.getItem("token");


    const response = await axios.delete(
        `${API_URL}/${reviewId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};