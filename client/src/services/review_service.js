
const API_URL = "http://localhost:8080/api/reviews";


// Create Review
export const createReview = async (reviewData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create review");
    }

    return data;
};


// Get Reviews for a Place
export const getPlaceReviews = async (placeId) => {
    const response = await fetch(
        `${API_URL}/place/${placeId}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch reviews");
    }

    return data;
};


// Update Review
export const updateReview = async (reviewId, reviewData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/${reviewId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(reviewData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update review");
    }

    return data;
};


// Delete Review
export const deleteReview = async (reviewId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/${reviewId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete review");
    }

    return data;
};

