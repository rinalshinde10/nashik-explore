
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import "./PlaceDetails.css";

import { getPlaces } from "../../services/place_service";

import {
    getPlaceReviews,
    createReview
} from "../../services/review_service";


function PlaceDetails() {

    const { id } = useParams();

    const navigate = useNavigate();


    // =============================
    // STATE
    // =============================

    const [place, setPlace] = useState(null);

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);

    const [reviewsLoading, setReviewsLoading] = useState(true);

    const [selectedRating, setSelectedRating] = useState(0);

    const [comment, setComment] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");

    const [reviewError, setReviewError] = useState("");


    // =============================
    // FETCH PLACE
    // =============================

    const fetchPlace = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getPlaces();

            const foundPlace = data.places?.find(
                (item) => item._id === id
            );

            if (!foundPlace) {

                setError("Place not found.");

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


    // =============================
    // FETCH REVIEWS
    // =============================

    const fetchReviews = async () => {

        try {

            setReviewsLoading(true);

            setReviewError("");

            const data = await getPlaceReviews(id);

            setReviews(
                data.reviews || []
            );

        } catch (error) {

            console.error(
                "Error fetching reviews:",
                error.message
            );

            setReviewError(
                "Unable to load reviews."
            );

        } finally {

            setReviewsLoading(false);

        }

    };


    // =============================
    // INITIAL LOAD
    // =============================

    useEffect(() => {

        window.scrollTo(0, 0);

        fetchPlace();

        fetchReviews();

    }, [id]);


    // =============================
    // RATING
    // =============================

    const handleRating = (rating) => {

        setSelectedRating(rating);

    };


    // =============================
    // SUBMIT REVIEW
    // =============================

    const handleSubmitReview = async (event) => {

        event.preventDefault();

        setReviewError("");


        // Check login

        const token =
            localStorage.getItem("token");


        if (!token) {

            alert(
                "Please login to submit a review."
            );

            navigate("/login");

            return;

        }


        // Check rating

        if (!selectedRating) {

            setReviewError(
                "Please select a rating."
            );

            return;

        }


        // Check comment

        if (!comment.trim()) {

            setReviewError(
                "Please enter your review."
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
                error.message ||
                "Failed to add review."
            );

        } finally {

            setSubmitting(false);

        }

    };


    // =============================
    // GOOGLE MAP
    // =============================

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


    // =============================
    // BACK TO PLACES
    // =============================

    const handleBack = () => {

        navigate("/places");

    };


    // =============================
    // LOADING
    // =============================

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


    // =============================
    // ERROR / PLACE NOT FOUND
    // =============================

    if (error || !place) {

        return (

            <main className="place-details-page">

                <div className="details-message">

                    <h2>
                        {error || "Place not found"}
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


    // =============================
    // JSX
    // =============================

    return (

        <main className="place-details-page">


            {/* ============================= */}
            {/* BACK BUTTON */}
            {/* ============================= */}

            <Button
                className="back-button"
                onClick={handleBack}
            >
                ← Back to Places
            </Button>


            {/* ============================= */}
            {/* PLACE DETAILS */}
            {/* ============================= */}

            <section className="place-details-card">

                <div className="place-details-content">


                    {/* PLACE NAME */}

                    <h1>
                        {place.name}
                    </h1>


                    {/* CATEGORY */}

                    {place.category?.name && (

                        <p className="details-category">
                            {place.category.name}
                        </p>

                    )}


                    {/* DESCRIPTION */}

                    <p className="details-description">
                        {place.description}
                    </p>


                    {/* LOCATION */}

                    {place.location && (

                        <p className="details-location">
                            📍 {place.location}
                        </p>

                    )}


                    {/* ADDRESS */}

                    {place.address && (

                        <p className="details-address">
                            🏠 {place.address}
                        </p>

                    )}


                    {/* TIMING */}

                    {(place.openingTime ||
                        place.closingTime) && (

                        <p className="details-timing">

                            🕒{" "}

                            {place.openingTime || "--"}

                            {" - "}

                            {place.closingTime || "--"}

                        </p>

                    )}


                    {/* RATING */}

                    <div className="details-rating">

                        <span className="average-rating">

                            ⭐{" "}

                            {place.averageRating
                                ? place.averageRating
                                : "No rating"}

                        </span>


                        <span className="review-count">

                            (
                            {place.totalReviews || 0}
                            {" "}
                            {place.totalReviews === 1
                                ? "review"
                                : "reviews"}
                            )

                        </span>

                    </div>


                    {/* GOOGLE MAP */}

                    <Button
                        className="details-map-button"
                        onClick={openLocation}
                    >
                        View on Google Maps
                    </Button>

                </div>

            </section>


            {/* ============================= */}
            {/* ADD REVIEW */}
            {/* ============================= */}

            <section className="review-section">

                <h2>
                    Rate this place
                </h2>


                {/* REVIEW ERROR */}

                {reviewError && (

                    <p className="login-error">
                        {reviewError}
                    </p>

                )}


                {/* STAR RATING */}

                <div className="review-stars">

                    {[1, 2, 3, 4, 5].map(
                        (star) => (

                            <button
                                key={star}
                                type="button"
                                className={
                                    star <= selectedRating
                                        ? "review-star active"
                                        : "review-star"
                                }
                                onClick={() =>
                                    handleRating(star)
                                }
                                aria-label={`Rate ${star} stars`}
                            >
                                ★
                            </button>

                        )
                    )}

                </div>


                {/* REVIEW FORM */}

                <form
                    className="review-form"
                    onSubmit={handleSubmitReview}
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
                    />


                    <p className="review-character-count">
                        {comment.length}/500
                    </p>


                    {/* COMMON BUTTON */}

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


            {/* ============================= */}
            {/* REVIEWS */}
            {/* ============================= */}

            <section className="reviews-section">

                <h2>
                    Reviews
                </h2>


                {/* REVIEWS LOADING */}

                {reviewsLoading && (

                    <p className="no-reviews">
                        Loading reviews...
                    </p>

                )}


                {/* REVIEW ERROR */}

                {!reviewsLoading &&
                    reviewError &&
                    reviews.length === 0 && (

                        <p className="no-reviews">
                            Unable to load reviews.
                        </p>

                    )}


                {/* REVIEWS LIST */}

                {!reviewsLoading &&
                    reviews.length > 0 && (

                        <div className="reviews-list">

                            {reviews.map(
                                (review) => (

                                    <div
                                        className="review-card"
                                        key={review._id}
                                    >

                                        <div className="review-card-top">

                                            <strong>
                                                {
                                                    review.user?.name ||
                                                    "User"
                                                }
                                            </strong>


                                            <div className="review-card-stars">

                                                {"★".repeat(
                                                    review.rating
                                                )}

                                            </div>

                                        </div>


                                        <p>
                                            {review.comment}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    )}


                {/* NO REVIEWS */}

                {!reviewsLoading &&
                    !reviewError &&
                    reviews.length === 0 && (

                        <p className="no-reviews">
                            No reviews yet. Be the first to review this place.
                        </p>

                    )}

            </section>

        </main>

    );

}


export default PlaceDetails;

