
import { useEffect, useState } from "react";

import "./Places.css";

import Heading from "../../components/Heading/Heading";
import "../../components/Heading/Heading.css";

import { getPlaces } from "../../services/place_service";
import { getCategories } from "../../services/category_service";
import { createReview } from "../../services/review_service";


function Places() {

    const [places, setPlaces] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    // User selected ratings
    const [userRatings, setUserRatings] = useState({});


    // =============================
    // INITIAL LOAD
    // =============================

    useEffect(() => {

        fetchPlaces();
        fetchCategories();

    }, []);


    // =============================
    // FETCH PLACES
    // =============================

    const fetchPlaces = async (
        searchValue = search,
        categoryValue = category
    ) => {

        try {

            const data = await getPlaces({
                search: searchValue,
                category: categoryValue
            });

            console.log("Places:", data);

            setPlaces(data.places || []);

        } catch (error) {

            console.error(
                "Error fetching places:",
                error.response?.data || error.message
            );

        }
    };


    // =============================
    // FETCH CATEGORIES
    // =============================

    const fetchCategories = async () => {

        try {

            const data = await getCategories();

            console.log("Categories:", data);

            setCategories(data.categories || []);

        } catch (error) {

            console.error(
                "Error fetching categories:",
                error.response?.data || error.message
            );

        }
    };


    // =============================
    // SEARCH
    // =============================

    const handleSearch = (event) => {

        const value = event.target.value;

        setSearch(value);

        fetchPlaces(value, category);

    };


    // =============================
    // CATEGORY FILTER
    // =============================

    const handleCategoryChange = (event) => {

        const value = event.target.value;

        setCategory(value);

        fetchPlaces(search, value);

    };


    // =============================
    // RATING
    // =============================

    const handleRating = async (placeId, rating) => {

        try {

            const data = await createReview({

                place: placeId,

                rating: rating,

                comment: `Rated ${rating} stars`

            });


            console.log("Rating response:", data);


            // Show selected rating immediately

            setUserRatings((previousRatings) => ({

                ...previousRatings,

                [placeId]: rating

            }));


            // Refresh places so average rating comes
            // from backend

            await fetchPlaces(search, category);


        } catch (error) {

            console.error(
                "Error adding rating:",
                error.response?.data || error.message
            );

        }

    };


    // =============================
    // GOOGLE MAP
    // =============================

    const openLocation = (place) => {

        const searchQuery =
            `${place.name}, ${place.location}`;


        const mapUrl =
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;


        window.open(mapUrl, "_blank");

    };


    // =============================
    // JSX
    // =============================

    return (

        <main className="places-page">


            {/* ============================= */}
            {/* HEADER */}
            {/* ============================= */}

            <section className="places-header">

                <p className="section-label">
                    EXPLORE NASHIK
                </p>


                <Heading
                    title="Discover Places in Nashik"
                    subtitle="Explore temples, historical places, waterfalls, forts, vineyards and other beautiful destinations."
                />


                {/* ============================= */}
                {/* SEARCH + CATEGORY */}
                {/* ============================= */}

                <div
                    className="places-filters"
                >


                    {/* SEARCH */}

                    <div className="places-search">

                        <input
                            type="text"
                            placeholder="Search places..."
                            value={search}
                            onChange={handleSearch}
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="category-filter">

                        <select
                            value={category}
                            onChange={handleCategoryChange}
                        >

                            <option value="">
                                All Categories
                            </option>


                            {categories.map((item) => (

                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.name}
                                </option>

                            ))}

                        </select>

                    </div>

                </div>

            </section>


            {/* ============================= */}
            {/* PLACES */}
            {/* ============================= */}

            <section className="places-content">

                <div className="places-grid">


                    {places.length > 0 ? (

                        places.map((place) => {


                            /*
                             * If user has clicked a star,
                             * show that rating.
                             *
                             * Otherwise show backend
                             * average rating.
                             */

                            const selectedRating =
                                userRatings[place._id] ||
                                Math.round(place.averageRating || 0);


                            return (

                                <div
                                    className="place-card"
                                    key={place._id}
                                >

                                    <div className="place-card-content">


                                        {/* ============================= */}
                                        {/* PLACE NAME */}
                                        {/* ============================= */}

                                        <h2>
                                            {place.name}
                                        </h2>


                                        {/* ============================= */}
                                        {/* CATEGORY */}
                                        {/* ============================= */}

                                        <p className="place-category">

                                            {place.category?.name}

                                        </p>


                                        {/* ============================= */}
                                        {/* RATING */}
                                        {/* ============================= */}

                                        <div className="place-rating">

                                            <div className="rating-stars">


                                                {[1, 2, 3, 4, 5].map(
                                                    (star)
                                                 (

                                                    <button
                                                        key={star}
                                                        type="button"
                                                        className={
                                                            star <= selectedRating
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

                                                ))}

                                            </div>

                                        </div>


                                        {/* ============================= */}
                                        {/* DESCRIPTION */}
                                        {/* ============================= */}

                                        <p className="place-description">

                                            {place.description}

                                        </p>


                                        {/* ============================= */}
                                        {/* LOCATION */}
                                        {/* ============================= */}

                                        <p className="place-location">

                                            📍 {place.location}

                                        </p>


                                        {/* ============================= */}
                                        {/* BUTTON */}
                                        {/* ============================= */}

                                        <button
                                            className="map-button"
                                            onClick={() =>
                                                openLocation(place)
                                            }
                                        >

                                            View Place Details

                                        </button>


                                    </div>

                                </div>

                            );

                        })

                    ) : (

                        <p className="no-places">
                            No places found.
                        </p>

                    )}

                </div>

            </section>

        </main>

    );

}


export default Places;

