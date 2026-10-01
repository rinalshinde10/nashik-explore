
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import {
    getFavorites,
    removeFavorite
} from "../../services/favorite_service";

import "./Favorites.css";


function Favorites() {

    const navigate = useNavigate();


    // ==========================================
    // STATES
    // ==========================================

    const [favorites, setFavorites] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [removingId, setRemovingId] = useState(null);


    // ==========================================
    // FETCH FAVORITES
    // ==========================================

    const fetchFavorites = async () => {

        const token =
            localStorage.getItem("token");


        // Login required
        if (!token) {

            setLoading(false);

            navigate("/login");

            return;

        }


        try {

            setLoading(true);

            setError("");


            const data =
                await getFavorites();


            const favoriteList =
                Array.isArray(data.favorites)
                    ? data.favorites
                    : [];


            // Remove invalid favorites
            const validFavorites =
                favoriteList.filter(
                    (favorite) =>
                        favorite &&
                        favorite._id &&
                        favorite.place
                );


            setFavorites(
                validFavorites
            );


        } catch (error) {

            console.error(
                "Error fetching favorites:",
                error.message
            );


            setError(
                error.message ||
                "Unable to load favorites."
            );


        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        fetchFavorites();

    }, []);


    // ==========================================
    // AUTH CHANGE
    // ==========================================

    useEffect(() => {

        const handleAuthChange = () => {

            const token =
                localStorage.getItem("token");


            if (!token) {

                setFavorites([]);

                navigate("/login");

                return;

            }


            fetchFavorites();

        };


        window.addEventListener(
            "authChanged",
            handleAuthChange
        );


        window.addEventListener(
            "storage",
            handleAuthChange
        );


        return () => {

            window.removeEventListener(
                "authChanged",
                handleAuthChange
            );


            window.removeEventListener(
                "storage",
                handleAuthChange
            );

        };

    }, []);


    // ==========================================
    // REMOVE FAVORITE
    // ==========================================

    const handleRemoveFavorite = async (
        placeId,
        favoriteId
    ) => {

        if (!placeId) {

            return;

        }


        try {

            setRemovingId(
                favoriteId
            );


            await removeFavorite(
                placeId
            );


            // Immediately update UI
            setFavorites(
                (previousFavorites) =>
                    previousFavorites.filter(
                        (favorite) =>
                            favorite._id !==
                            favoriteId
                    )
            );


            // Tell other components
            window.dispatchEvent(
                new Event("favoritesChanged")
            );


        } catch (error) {

            console.error(
                "Remove favorite error:",
                error.message
            );


            alert(
                error.message ||
                "Unable to remove favorite."
            );


        } finally {

            setRemovingId(null);

        }

    };


    // ==========================================
    // VIEW DETAILS
    // ==========================================

    const handleViewDetails = (
        placeId
    ) => {

        if (!placeId) {

            return;

        }


        navigate(
            `/places/${placeId}`
        );

    };


    // ==========================================
    // RETRY
    // ==========================================

    const handleRetry = () => {

        fetchFavorites();

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <main className="favorites-page">

                <section className="favorites-container">

                    <p className="favorites-message">
                        Loading your favorites...
                    </p>

                </section>

            </main>

        );

    }


    // ==========================================
    // JSX
    // ==========================================

    return (

        <main className="favorites-page">


            {/* ==================================
                HEADER
            ================================== */}

            <section className="favorites-header">

                <p className="favorites-label">
                    YOUR COLLECTION
                </p>


                <h1>
                    My Favorites
                </h1>


                <p>
                    Places you have saved while
                    exploring Nashik.
                </p>

            </section>


            {/* ==================================
                ERROR
            ================================== */}

            {error && (

                <section className="favorites-container">

                    <div className="favorites-message">

                        <p>
                            {error}
                        </p>


                        <Button
                            type="button"
                            onClick={
                                handleRetry
                            }
                        >
                            Try Again
                        </Button>

                    </div>

                </section>

            )}


            {/* ==================================
                EMPTY
            ================================== */}

            {!error &&
                favorites.length === 0 && (

                    <section className="favorites-container">

                        <div className="favorites-empty">

                            <div className="empty-heart">
                                ♡
                            </div>


                            <h2>
                                No Favorites Yet
                            </h2>


                            <p>
                                You haven't saved any
                                places yet. Explore Nashik
                                and add your favorite
                                destinations here.
                            </p>


                            <Button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/places"
                                    )
                                }
                            >
                                Explore Places
                            </Button>

                        </div>

                    </section>

                )}


            {/* ==================================
                FAVORITES GRID
            ================================== */}

            {!error &&
                favorites.length > 0 && (

                    <section className="favorites-container">

                        <div className="favorites-top">

                            <h2>
                                Saved Places
                            </h2>


                            <span>
                                {favorites.length}{" "}
                                {favorites.length === 1
                                    ? "Place"
                                    : "Places"}
                            </span>

                        </div>


                        <div className="favorites-grid">

                            {favorites.map(
                                (favorite) => {

                                    const place =
                                        favorite.place;


                                    if (!place) {

                                        return null;

                                    }


                                    const placeId =
                                        place._id;


                                    const isRemoving =
                                        removingId ===
                                        favorite._id;


                                    return (

                                        <article
                                            className="favorite-card"
                                            key={
                                                favorite._id
                                            }
                                        >


                                            {/* ==================================
                                                CARD HEADER
                                            ================================== */}

                                            <div className="favorite-card-header">

                                                <div>

                                                    <h3>
                                                        {
                                                            place.name ||
                                                            "Unknown Place"
                                                        }
                                                    </h3>


                                                    <p className="favorite-category">

                                                        {
                                                            place.category?.name ||
                                                            "Nashik"
                                                        }

                                                    </p>

                                                </div>


                                                <button
                                                    type="button"
                                                    className="favorite-remove-button"
                                                    onClick={() =>
                                                        handleRemoveFavorite(
                                                            placeId,
                                                            favorite._id
                                                        )
                                                    }
                                                    disabled={
                                                        isRemoving
                                                    }
                                                    aria-label="Remove favorite"
                                                    title="Remove from favorites"
                                                >

                                                    {isRemoving
                                                        ? "..."
                                                        : "♥"}

                                                </button>

                                            </div>


                                            {/* ==================================
                                                DESCRIPTION
                                            ================================== */}

                                            <p className="favorite-description">

                                                {
                                                    place.description ||
                                                    "Explore this beautiful destination in Nashik."
                                                }

                                            </p>


                                            {/* ==================================
                                                LOCATION
                                            ================================== */}

                                            {place.location && (

                                                <p className="favorite-location">

                                                    📍{" "}

                                                    {
                                                        place.location
                                                    }

                                                </p>

                                            )}


                                            {/* ==================================
                                                RATING
                                            ================================== */}

                                            <div className="favorite-rating">

                                                <span>

                                                    ⭐{" "}

                                                    {
                                                        place.averageRating ||
                                                        "No rating"
                                                    }

                                                </span>


                                                <span>

                                                    (
                                                    {
                                                        place.totalReviews ||
                                                        0
                                                    }{" "}
                                                    reviews)

                                                </span>

                                            </div>


                                            {/* ==================================
                                                TIMING
                                            ================================== */}

                                            {(place.openingTime ||
                                                place.closingTime) && (

                                                <p className="favorite-timing">

                                                    🕒{" "}

                                                    {
                                                        place.openingTime ||
                                                        "--"
                                                    }

                                                    {" - "}

                                                    {
                                                        place.closingTime ||
                                                        "--"
                                                    }

                                                </p>

                                            )}


                                            {/* ==================================
                                                ACTION
                                            ================================== */}

                                            <Button
                                                type="button"
                                                className="favorite-details-button"
                                                onClick={() =>
                                                    handleViewDetails(
                                                        placeId
                                                    )
                                                }
                                            >
                                                View Place Details
                                            </Button>


                                        </article>

                                    );

                                }
                            )}

                        </div>

                    </section>

                )}

        </main>

    );

}


export default Favorites;

