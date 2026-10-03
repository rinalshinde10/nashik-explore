
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import "./Places.css";

import Heading from "../../components/Heading/Heading";
import "../../components/Heading/Heading.css";

import { getPlaces } from "../../services/place_service";
import { getCategories } from "../../services/category_service";
import { createReview } from "../../services/review_service";


function Places() {

    const navigate = useNavigate();

    const [searchParams, setSearchParams] =
        useSearchParams();


    // ==========================================
    // STATES
    // ==========================================

    const [places, setPlaces] = useState([]);

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );

    const [category, setCategory] = useState(
        searchParams.get("category") || ""
    );

    const [userRatings, setUserRatings] =
        useState({});

    const [loading, setLoading] =
        useState(true);

    const [categoriesLoading, setCategoriesLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [categoriesError, setCategoriesError] =
        useState("");


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        fetchCategories();

    }, []);


    // ==========================================
    // SCROLL TO TOP
    // ==========================================

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);


    // ==========================================
    // FETCH PLACES WHEN URL FILTER CHANGES
    // ==========================================

    useEffect(() => {

        const searchValue =
            searchParams.get("search") || "";

        const categoryValue =
            searchParams.get("category") || "";


        // Keep states synchronized with URL

        setSearch(searchValue);

        setCategory(categoryValue);


        // Fetch places using URL values

        fetchPlaces(
            searchValue,
            categoryValue
        );

    }, [searchParams]);


    // ==========================================
    // FETCH PLACES
    // ==========================================

    const fetchPlaces = async (
        searchValue = "",
        categoryValue = ""
    ) => {

        try {

            setLoading(true);

            setError("");


            const data = await getPlaces({

                search: searchValue.trim(),

                category: categoryValue

            });


            console.log(
                "Places:",
                data
            );


            setPlaces(
                Array.isArray(data.places)
                    ? data.places
                    : []
            );


        } catch (error) {

            console.error(
                "Error fetching places:",
                error.message
            );


            setError(
                "Unable to load places. Please try again."
            );


        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // FETCH CATEGORIES
    // ==========================================

    const fetchCategories = async () => {

        try {

            setCategoriesLoading(true);

            setCategoriesError("");


            const data =
                await getCategories();


            console.log(
                "Categories:",
                data
            );


            setCategories(
                Array.isArray(data.categories)
                    ? data.categories
                    : []
            );


        } catch (error) {

            console.error(
                "Error fetching categories:",
                error.message
            );


            setCategoriesError(
                "Unable to load categories."
            );


        } finally {

            setCategoriesLoading(false);

        }

    };


    // ==========================================
    // SEARCH
    // ==========================================

    const handleSearch = (event) => {

        const value =
            event.target.value;


        setSearch(value);


        setSearchParams(
            (previousParams) => {

                const params =
                    new URLSearchParams(
                        previousParams
                    );


                if (value.trim()) {

                    params.set(
                        "search",
                        value
                    );

                } else {

                    params.delete(
                        "search"
                    );

                }


                return params;

            }
        );

    };


    // ==========================================
    // CATEGORY FILTER
    // ==========================================

    const handleCategoryChange = (
        event
    ) => {

        const value =
            event.target.value;


        setCategory(value);


        setSearchParams(
            (previousParams) => {

                const params =
                    new URLSearchParams(
                        previousParams
                    );


                if (value) {

                    params.set(
                        "category",
                        value
                    );

                } else {

                    params.delete(
                        "category"
                    );

                }


                return params;

            }
        );

    };


    // ==========================================
    // CLEAR FILTERS
    // ==========================================

    const handleClearFilters = () => {

        setSearch("");

        setCategory("");

        setSearchParams({});

    };


    // ==========================================
    // RATING
    // ==========================================

    const handleRating = async (
        placeId,
        rating
    ) => {

        const token =
            localStorage.getItem("token");


        if (!token) {

            alert(
                "Please login to submit a rating."
            );

            navigate("/login");

            return;

        }


        try {

            const data =
                await createReview({

                    place: placeId,

                    rating: rating,

                    comment:
                        `Rated ${rating} stars`

                });


            console.log(
                "Rating response:",
                data
            );


            setUserRatings(
                (previousRatings) => ({

                    ...previousRatings,

                    [placeId]: rating

                })
            );


            await fetchPlaces(
                search,
                category
            );


        } catch (error) {

            console.error(
                "Error adding rating:",
                error.message
            );


            alert(
                error.response?.data?.message ||
                error.message ||
                "Unable to submit rating."
            );

        }

    };


    // ==========================================
    // VIEW PLACE DETAILS
    // ==========================================

    const viewPlaceDetails = (
        placeId
    ) => {

        navigate(
            `/places/${placeId}`
        );

    };


    // ==========================================
    // RETRY
    // ==========================================

    const handleRetry = () => {

        fetchPlaces(
            search,
            category
        );

    };


    // ==========================================
    // JSX
    // ==========================================

    return (

        <main className="places-page">


            {/* ==========================================
                HEADER
            ========================================== */}

            <section className="places-header">

                <p className="section-label">
                    EXPLORE NASHIK
                </p>


                <Heading
                    title="Discover Places in Nashik"
                    subtitle="Explore temples, historical places, waterfalls, forts, vineyards and other beautiful destinations."
                />


                {/* ==========================================
                    FILTERS
                ========================================== */}

                <div className="places-filters">


                    {/* SEARCH */}

                    <div className="places-search">

                        <input
                            type="text"
                            placeholder="Search places..."
                            value={search}
                            onChange={
                                handleSearch
                            }
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="category-filter">

                        <select
                            value={category}
                            onChange={
                                handleCategoryChange
                            }
                            disabled={
                                categoriesLoading
                            }
                        >

                            <option value="">

                                {categoriesLoading
                                    ? "Loading categories..."
                                    : "All Categories"}

                            </option>


                            {categories.map(
                                (item) => (

                                    <option
                                        key={
                                            item._id
                                        }
                                        value={
                                            item._id
                                        }
                                    >

                                        {item.name}

                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* CLEAR FILTER */}

                    {(search || category) && (

                        <Button
                            type="button"
                            onClick={
                                handleClearFilters
                            }
                        >
                            Clear Filters
                        </Button>

                    )}

                </div>


                {/* CATEGORY ERROR */}

                {categoriesError && (

                    <div className="no-places">

                        <p>
                            {categoriesError}
                        </p>


                        <Button
                            type="button"
                            onClick={
                                fetchCategories
                            }
                        >
                            Try Again
                        </Button>

                    </div>

                )}

            </section>


            {/* ==========================================
                PLACES CONTENT
            ========================================== */}

            <section className="places-content">

                <div className="places-grid">


                    {/* LOADING */}

                    {loading && (

                        <p className="no-places">
                            Loading places...
                        </p>

                    )}


                    {/* ERROR */}

                    {!loading && error && (

                        <div className="no-places">

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

                    )}


                    {/* PLACES */}

                    {!loading &&
                        !error &&
                        places.length > 0 &&

                        places.map(
                            (place) => {

                                const selectedRating =
                                    userRatings[
                                        place._id
                                    ] ||
                                    Math.round(
                                        place.averageRating ||
                                        0
                                    );


                                return (

                                    <div
                                        className="place-card"
                                        key={
                                            place._id
                                        }
                                    >

                                        <div className="place-card-content">


                                            {/* NAME */}

                                            <div className="place-title-row">

                                                <h2>
                                                    {place.name}
                                                </h2>

                                            </div>


                                            {/* CATEGORY */}

                                            <p className="place-category">

                                                {
                                                    place.category?.name ||
                                                    "Uncategorized"
                                                }

                                            </p>


                                            {/* RATING */}

                                            <div className="place-rating">

                                                <div className="rating-stars">

                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (

                                                            <button
                                                                key={
                                                                    star
                                                                }
                                                                type="button"
                                                                className={
                                                                    star <=
                                                                    selectedRating
                                                                        ? "rating-star active"
                                                                        : "rating-star"
                                                                }
                                                                onClick={() =>
                                                                    handleRating(
                                                                        place._id,
                                                                        star
                                                                    )
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


                                                <span className="rating-value">

                                                    {place.averageRating
                                                        ? place.averageRating
                                                        : "No rating"}

                                                    {" "}

                                                    (
                                                    {
                                                        place.totalReviews ||
                                                        0
                                                    }
                                                    )

                                                </span>

                                            </div>


                                            {/* DESCRIPTION */}

                                            <p className="place-description">

                                                {
                                                    place.description ||
                                                    "No description available."
                                                }

                                            </p>


                                            {/* LOCATION */}

                                            {place.location && (

                                                <p className="place-location">

                                                    📍{" "}

                                                    {
                                                        place.location
                                                    }

                                                </p>

                                            )}


                                            {/* ADDRESS */}

                                            {place.address && (

                                                <p className="place-address">

                                                    🏠{" "}

                                                    {
                                                        place.address
                                                    }

                                                </p>

                                            )}


                                            {/* TIMING */}

                                            {(place.openingTime ||
                                                place.closingTime) && (

                                                <p className="place-timing">

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


                                            {/* DETAILS BUTTON */}

                                            <Button
                                                type="button"
                                                className="map-button"
                                                onClick={() =>
                                                    viewPlaceDetails(
                                                        place._id
                                                    )
                                                }
                                            >
                                                View Place Details
                                            </Button>


                                        </div>

                                    </div>

                                );

                            }
                        )
                    }


                    {/* NO PLACES */}

                    {!loading &&
                        !error &&
                        places.length === 0 && (

                            <div className="no-places">

                                <p>
                                    No places found.
                                </p>


                                {(search ||
                                    category) && (

                                    <Button
                                        type="button"
                                        onClick={
                                            handleClearFilters
                                        }
                                    >
                                        View All Places
                                    </Button>

                                )}

                            </div>

                        )}

                </div>

            </section>

        </main>

    );

}


export default Places;

