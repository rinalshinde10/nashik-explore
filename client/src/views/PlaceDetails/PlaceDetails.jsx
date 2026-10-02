
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import "./PlaceDetails.css";

import { getPlaces } from "../../services/place_service";

import {
    getPlaceReviews,
    createReview,
    updateReview,
    deleteReview
} from "../../services/review_service";


function PlaceDetails() {
useEffect(() => {
    window.scrollTo(0, 0);
}, []);
    const { id } = useParams();

    const navigate = useNavigate();


    // ==========================================
    // PLACE STATE
    // ==========================================

    const [place, setPlace] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // REVIEW STATE
    // ==========================================

    const [reviews, setReviews] = useState([]);

    const [reviewsLoading, setReviewsLoading] =
        useState(true);

    const [reviewError, setReviewError] =
        useState("");


    // ==========================================
    // REVIEW FORM
    // ==========================================

    const [selectedRating, setSelectedRating] =
        useState(0);

    const [comment, setComment] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);


    // ==========================================
    // EDIT REVIEW
    // ==========================================

    const [editingReviewId, setEditingReviewId] =
        useState(null);

    const [editRating, setEditRating] =
        useState(0);

    const [editComment, setEditComment] =
        useState("");

    const [editLoading, setEditLoading] =
        useState(false);


    // ==========================================
    // DELETE REVIEW
    // ==========================================

    const [deletingReviewId, setDeletingReviewId] =
        useState(null);


    // ==========================================
    // CURRENT USER
    // ==========================================

    const getCurrentUserId = () => {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );

            return user?._id || user?.id || null;

        } catch {

            return null;

        }

    };


    // ==========================================
    // FETCH PLACE
    // ==========================================

    const fetchPlace = async () => {

        try {

            setLoading(true);

            setError("");


            const data =
                await getPlaces();


            const foundPlace =
                data.places?.find(
                    (item) =>
                        item._id === id
                );


            if (!foundPlace) {

                setError(
                    "Place not found."
                );

                setPlace(null);

                return;

            }


            setPlace(foundPlace);

        } catch (error) {

            console.error(
                "Error fetching place:",
                error.message
            );


            setError(
                "Unable to load place details."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // FETCH REVIEWS
    // ==========================================

    const fetchReviews = async () => {

        try {

            setReviewsLoading(true);

            setReviewError("");


            const data =
                await getPlaceReviews(id);


            setReviews(
                Array.isArray(data.reviews)
                    ? data.reviews
                    : []
            );

        } catch (error) {

            console.error(
                "Error fetching reviews:",
                error.message
            );


            setReviewError(
                error.response?.data?.message ||
                "Unable to load reviews."
            );

        } finally {

            setReviewsLoading(false);

        }

    };


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        window.scrollTo(0, 0);

        fetchPlace();

        fetchReviews();

    }, [id]);


    // ==========================================
    // NEW REVIEW RATING
    // ==========================================

    const handleRating = (rating) => {

        setSelectedRating(rating);

    };


    // ==========================================
    // SUBMIT NEW REVIEW
    // ==========================================

    const handleSubmitReview = async (
        event
    ) => {

        event.preventDefault();

        setReviewError("");


        const token =
            localStorage.getItem("token");


        // Login required

        if (!token) {

            alert(
                "Please login to submit a review."
            );

            navigate("/login");

            return;

        }


        // Rating required

        if (!selectedRating) {

            setReviewError(
                "Please select a rating."
            );

            return;

        }


        // Comment required

        if (!comment.trim()) {

            setReviewError(
                "Please enter your review."
            );

            return;

        }


        if (comment.trim().length > 500) {

            setReviewError(
                "Review cannot exceed 500 characters."
            );

            return;

        }


        try {

            setSubmitting(true);


            await createReview({

                place: id,

                rating: selectedRating,

                comment: comment.trim()

            });


            // Clear form

            setSelectedRating(0);

            setComment("");


            // Refresh reviews

            await fetchReviews();


            // Refresh place rating

            await fetchPlace();


            alert(
                "Review added successfully."
            );

        } catch (error) {

            console.error(
                "Error adding review:",
                error.message
            );


            setReviewError(
                error.response?.data?.message ||
                error.message ||
                "Failed to add review."
            );

        } finally {

            setSubmitting(false);

        }

    };


    // ==========================================
    // START EDIT REVIEW
    // ==========================================

    const handleEditReview = (review) => {

        setEditingReviewId(
            review._id
        );

        setEditRating(
            review.rating
        );

        setEditComment(
            review.comment || ""
        );

        setReviewError("");

    };


    // ==========================================
    // CANCEL EDIT
    // ==========================================

    const handleCancelEdit = () => {

        setEditingReviewId(null);

        setEditRating(0);

        setEditComment("");

    };


    // ==========================================
    // UPDATE REVIEW
    // ==========================================

    const handleUpdateReview = async (
        reviewId
    ) => {

        setReviewError("");


        const token =
            localStorage.getItem("token");


        if (!token) {

            navigate("/login");

            return;

        }


        if (!editRating) {

            setReviewError(
                "Please select a rating."
            );

            return;

        }


        if (!editComment.trim()) {

            setReviewError(
                "Please enter your review."
            );

            return;

        }


        if (
            editComment.trim().length > 500
        ) {

            setReviewError(
                "Review cannot exceed 500 characters."
            );

            return;

        }


        try {

            setEditLoading(true);


            await updateReview(

                reviewId,

                {
                    rating: editRating,
                    comment:
                        editComment.trim()
                }

            );


            setEditingReviewId(null);

            setEditRating(0);

            setEditComment("");


            await fetchReviews();

            await fetchPlace();


            alert(
                "Review updated successfully."
            );

        } catch (error) {

            console.error(
                "Error updating review:",
                error.message
            );


            setReviewError(
                error.response?.data?.message ||
                error.message ||
                "Failed to update review."
            );

        } finally {

            setEditLoading(false);

        }

    };


    // ==========================================
    // DELETE REVIEW
    // ==========================================

    const handleDeleteReview = async (
        reviewId
    ) => {

        const token =
            localStorage.getItem("token");


        if (!token) {

            navigate("/login");

            return;

        }


        const confirmed =
            window.confirm(
                "Are you sure you want to delete this review?"
            );


        if (!confirmed) {

            return;

        }


        try {

            setDeletingReviewId(
                reviewId
            );


            await deleteReview(
                reviewId
            );


            if (
                editingReviewId ===
                reviewId
            ) {

                handleCancelEdit();

            }


            await fetchReviews();

            await fetchPlace();


        } catch (error) {

            console.error(
                "Error deleting review:",
                error.message
            );


            setReviewError(
                error.response?.data?.message ||
                error.message ||
                "Failed to delete review."
            );

        } finally {

            setDeletingReviewId(null);

        }

    };


    // ==========================================
    // GOOGLE MAP
    // ==========================================

    const openLocation = () => {

        if (!place) {

            return;

        }


        const searchQuery =
            `${place.name}, ${place.location}`;


        const mapUrl =
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                searchQuery
            )}`;


        window.open(
            mapUrl,
            "_blank",
            "noopener,noreferrer"
        );

    };


    // ==========================================
    // BACK TO PLACES
    // ==========================================

    const handleBack = () => {

        navigate("/places");

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <main className="place-details-page">

                <div className="details-message">

                    <p>
                        Loading place...
                    </p>

                </div>

            </main>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error || !place) {

        return (

            <main className="place-details-page">

                <div className="details-message">

                    <h2>
                        {error ||
                            "Place not found"}
                    </h2>


                    <Button
                        className="back-button"
                        onClick={handleBack}
                    >
                        Back to Places
                    </Button>

                </div>

            </main>

        );

    }


    const currentUserId =
        getCurrentUserId();


    // ==========================================
    // JSX
    // ==========================================

    return (

        <main className="place-details-page">


            {/* ==================================
                BACK BUTTON
            ================================== */}

            <Button
                className="back-button"
                onClick={handleBack}
            >
                ← Back to Places
            </Button>


            {/* ==================================
                PLACE DETAILS
            ================================== */}

            <section className="place-details-card">

                <div className="place-details-content">


                    <h1>
                        {place.name}
                    </h1>


                    {place.category?.name && (

                        <p className="details-category">

                            {place.category.name}

                        </p>

                    )}


                    <p className="details-description">

                        {place.description}

                    </p>


                    {place.location && (

                        <p className="details-location">

                            📍 {place.location}

                        </p>

                    )}


                    {place.address && (

                        <p className="details-address">

                            🏠 {place.address}

                        </p>

                    )}


                    {(place.openingTime ||
                        place.closingTime) && (

                        <p className="details-timing">

                            🕒{" "}

                            {place.openingTime ||
                                "--"}

                            {" - "}

                            {place.closingTime ||
                                "--"}

                        </p>

                    )}


                    <div className="details-rating">

                        <span className="average-rating">

                            ⭐{" "}

                            {place.averageRating
                                ? place.averageRating
                                : "No rating"}

                        </span>


                        <span className="review-count">

                            (
                            {place.totalReviews ||
                                0}
                            {" "}
                            {place.totalReviews === 1
                                ? "review"
                                : "reviews"}
                            )

                        </span>

                    </div>


                    <Button
                        className="details-map-button"
                        onClick={openLocation}
                    >
                        View on Google Maps
                    </Button>

                </div>

            </section>


            {/* ==================================
                ADD REVIEW
            ================================== */}

            <section className="review-section">

                <h2>
                    Rate this place
                </h2>


                {reviewError && (

                    <p className="login-error">

                        {reviewError}

                    </p>

                )}


                <div className="review-stars">

                    {[1, 2, 3, 4, 5].map(
                        (star) => (

                            <button
                                key={star}
                                type="button"
                                className={
                                    star <=
                                    selectedRating
                                        ? "review-star active"
                                        : "review-star"
                                }
                                onClick={() =>
                                    handleRating(
                                        star
                                    )
                                }
                                disabled={
                                    submitting
                                }
                                aria-label={
                                    `Rate ${star} stars`
                                }
                            >

                                ★

                            </button>

                        )
                    )}

                </div>


                <form
                    className="review-form"
                    onSubmit={
                        handleSubmitReview
                    }
                >

                    <textarea
                        value={comment}
                        onChange={(event) =>
                            setComment(
                                event.target.value
                            )
                        }
                        placeholder="Write your review..."
                        rows="4"
                        maxLength="500"
                        disabled={
                            submitting
                        }
                    />


                    <p className="review-character-count">

                        {comment.length}/500

                    </p>


                    <Button
                        type="submit"
                        disabled={submitting}
                    >

                        {submitting
                            ? "Submitting..."
                            : "Submit Review"}

                    </Button>

                </form>

            </section>


            {/* ==================================
                REVIEWS
            ================================== */}

            <section className="reviews-section">

                <h2>
                    Reviews
                </h2>


                {reviewsLoading && (

                    <p className="no-reviews">

                        Loading reviews...

                    </p>

                )}


                {!reviewsLoading &&
                    reviews.length === 0 &&
                    !reviewError && (

                        <p className="no-reviews">

                            No reviews yet.
                            Be the first to review
                            this place.

                        </p>

                    )}


                {!reviewsLoading &&
                    reviews.length > 0 && (

                        <div className="reviews-list">

                            {reviews.map(
                                (review) => {

                                    const reviewUserId =
                                        review.user?._id ||
                                        review.user?.id;


                                    const isOwnReview =
                                        currentUserId &&
                                        reviewUserId &&
                                        currentUserId ===
                                        reviewUserId;


                                    const isEditing =
                                        editingReviewId ===
                                        review._id;


                                    const isDeleting =
                                        deletingReviewId ===
                                        review._id;


                                    return (

                                        <div
                                            className="review-card"
                                            key={
                                                review._id
                                            }
                                        >


                                            {/* USER + RATING */}

                                            <div className="review-card-top">

                                                <strong>

                                                    {
                                                        review.user?.name ||
                                                        "User"
                                                    }

                                                </strong>


                                                {!isEditing && (

                                                    <div className="review-card-stars">

                                                        {"★".repeat(
                                                            review.rating
                                                        )}

                                                    </div>

                                                )}

                                            </div>


                                            {/* EDIT MODE */}

                                            {isEditing ? (

                                                <div className="review-edit-form">


                                                    <div className="edit-rating">

                                                        {[1, 2, 3, 4, 5].map(
                                                            (star) => (

                                                                <button
                                                                    key={
                                                                        star
                                                                    }
                                                                    type="button"
                                                                    className={
                                                                        star <=
                                                                        editRating
                                                                            ? "review-star active"
                                                                            : "review-star"
                                                                    }
                                                                    onClick={() =>
                                                                        setEditRating(
                                                                            star
                                                                        )
                                                                    }
                                                                >

                                                                    ★

                                                                </button>

                                                            )
                                                        )}

                                                    </div>


                                                    <textarea
                                                        value={
                                                            editComment
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            setEditComment(
                                                                event.target.value
                                                            )
                                                        }
                                                        rows="4"
                                                        maxLength="500"
                                                    />


                                                    <p className="review-character-count">

                                                        {
                                                            editComment.length
                                                        }
                                                        /500

                                                    </p>


                                                    <div className="review-edit-actions">

                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                handleUpdateReview(
                                                                    review._id
                                                                )
                                                            }
                                                            disabled={
                                                                editLoading
                                                            }
                                                        >

                                                            {editLoading
                                                                ? "Saving..."
                                                                : "Save Changes"}

                                                        </Button>


                                                        <Button
                                                            type="button"
                                                            onClick={
                                                                handleCancelEdit
                                                            }
                                                            disabled={
                                                                editLoading
                                                            }
                                                        >

                                                            Cancel

                                                        </Button>

                                                    </div>

                                                </div>

                                            ) : (

                                                <p>

                                                    {
                                                        review.comment ||
                                                        "No comment provided."
                                                    }

                                                </p>

                                            )}


                                            {/* OWN REVIEW ACTIONS */}

                                            {isOwnReview &&
                                                !isEditing && (

                                                    <div className="review-actions">

                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEditReview(
                                                                    review
                                                                )
                                                            }
                                                        >

                                                            Edit

                                                        </Button>


                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteReview(
                                                                    review._id
                                                                )
                                                            }
                                                            disabled={
                                                                isDeleting
                                                            }
                                                        >

                                                            {isDeleting
                                                                ? "Deleting..."
                                                                : "Delete"}

                                                        </Button>

                                                    </div>

                                                )}

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}

            </section>

        </main>

    );

}


export default PlaceDetails;



