
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


    const [place, setPlace] = useState(null);

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedRating, setSelectedRating] = useState(0);

    const [comment, setComment] = useState("");

    const [submitting, setSubmitting] = useState(false);


    // =============================
    // FETCH PLACE
    // =============================

    const fetchPlace = async () => {

        try {

            const data = await getPlaces();

            const foundPlace = data.places?.find(
                (item) => item._id === id
            );

            setPlace(foundPlace || null);

        } catch (error) {

            console.error(
                "Error fetching place:",
                error.message
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

            const data = await getPlaceReviews(id);

            setReviews(data.reviews || []);

        } catch (error) {

            console.error(
                "Error fetching reviews:",
                error.message
            );

        }

    };


    // =============================
    // INITIAL LOAD
    // =============================

    useEffect(() => {

        fetchPlace();

        fetchReviews();

        window.scrollTo(0, 0);

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


        if (!selectedRating) {

            alert("Please select a rating.");

            return;

        }


        if (!comment.trim()) {

            alert("Please enter your review.");

            return;

        }


        try {

            setSubmitting(true);


            await createReview({

                place: id,

                rating: selectedRating,

                comment: comment.trim()

            });


            setSelectedRating(0);

            setComment("");


            await fetchReviews();

            await fetchPlace();


            alert("Review added successfully.");


        } catch (error) {

            console.error(
                "Error adding review:",
                error.message
            );


            alert(
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
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;


        window.open(
            mapUrl,
            "_blank"
        );

    };


    // =============================
    // LOADING
    // =============================

    if (loading) {

        return (

            <main className="place-details-page">

                <p className="details-message">
                    Loading place...
                </p>

            </main>

        );

    }


    // =============================
    // PLACE NOT FOUND
    // =============================

    if (!place) {

        return (

            <main className="place-details-page">

                <div className="details-message">

                    <h2>
                        Place not found
                    </h2>


                    <Button
                        className="back-button"
                        onClick={() =>
                            navigate("/places")
                        }
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
                onClick={() =>
                    navigate("/places")
                }
            >
                ← Back to Places
            </Button>


            {/* ============================= */}
            {/* PLACE DETAILS */}
            {/* ============================= */}

            <section className="place-details-card">


                <div className="place-details-content">


                    {/* NAME */}

                    <h1>
                        {place.name}
                    </h1>


                    {/* CATEGORY */}

                    <p className="details-category">
                        {place.category?.name}
                    </p>


                    {/* DESCRIPTION */}

                    <p className="details-description">
                        {place.description}
                    </p>


                    {/* LOCATION */}

                    <p className="details-location">
                        📍 {place.location}
                    </p>


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

                            ({place.totalReviews || 0} reviews)

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
                            setComment(event.target.value)
                        }
                        placeholder="Write your review..."
                        rows="4"
                    />


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


                {reviews.length > 0 ? (

                    <div className="reviews-list">

                        {reviews.map(
                            (review) => (

                                <div
                                    className="review-card"
                                    key={review._id}
                                >

                                    <div className="review-card-top">

                                        <strong>
                                            {review.user?.name ||
                                                "User"}
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

                ) : (

                    <p className="no-reviews">
                        No reviews yet.
                    </p>

                )}

            </section>

        </main>

    );

}


export default PlaceDetails;

