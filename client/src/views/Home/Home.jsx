
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cards from "../../components/Cards/Cards";
import "../../components/Cards/Cards.css";

import { getCategories } from "../../services/category_service";

import templeIcon from "../../assets/Icons/temple.png";
import waterfallIcon from "../../assets/Icons/waterfall.png";
import fortIcon from "../../assets/Icons/fort.png";
import historicIcon from "../../assets/Icons/historic.png";
import vineyardsIcon from "../../assets/Icons/vineyards.png";
import natureIcon from "../../assets/Icons/nature.png";

import "./Home.css";


function Home() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================
    // CATEGORY ICONS
    // =========================

    const categoryIcons = {
        "Temples": templeIcon,
        "Waterfalls": waterfallIcon,
        "Forts": fortIcon,
        "Historical Places": historicIcon,
        "Nature & Parks": natureIcon,
        "Vineyards": vineyardsIcon
    };


    // =========================
    // FETCH CATEGORIES
    // =========================

    const fetchCategories = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getCategories();

            if (Array.isArray(data)) {

                setCategories(data);

            } else if (Array.isArray(data?.categories)) {

                setCategories(data.categories);

            } else if (Array.isArray(data?.data)) {

                setCategories(data.data);

            } else {

                setCategories([]);

            }

        } catch (error) {

            console.error(
                "Error fetching categories:",
                error
            );

            setError(
                "Unable to load categories. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // LOAD CATEGORIES
    // =========================

    useEffect(() => {

        fetchCategories();

    }, []);


    // =========================
    // CATEGORY CLICK
    // =========================

    const handleCategoryClick = (categoryId) => {

        if (!categoryId) {
            return;
        }

        navigate(
            `/places?category=${categoryId}`
        );

    };


    // =========================
    // EXPLORE PLACES
    // =========================

    const handleExplorePlaces = () => {

        navigate("/places");

    };


    return (

        <div className="home">


            {/* =========================
                HERO SECTION
            ========================= */}

            <section className="hero-section">

                <div className="hero-content">

                    <p className="hero-tag">
                        DISCOVER • EXPLORE • EXPERIENCE
                    </p>

                    <h1>
                        Explore
                        <span> Nashik</span>
                    </h1>

                    <p className="hero-description">
                        Discover temples, waterfalls, forts,
                        historical places, vineyards and beautiful
                        natural destinations in Nashik.
                    </p>

                    <button
                        className="explore-button"
                        onClick={handleExplorePlaces}
                    >
                        Explore Places
                    </button>

                </div>

            </section>


            {/* =========================
                WELCOME SECTION
            ========================= */}

            <section className="welcome-section">

                <p className="section-label">
                    WELCOME TO NASHIK EXPLORE
                </p>

                <h2>
                    Discover the Beauty of Nashik
                </h2>

                <p>
                    Nashik is a beautiful city known for its
                    temples, waterfalls, forts, historical places,
                    vineyards and natural attractions.
                    Nashik Explore helps you discover these
                    amazing places easily.
                </p>

            </section>


            {/* =========================
                CATEGORIES SECTION
            ========================= */}

            <section className="categories-section">

                <p className="section-label">
                    EXPLORE BY CATEGORY
                </p>

                <h2>
                    Discover Places
                </h2>

                <p>
                    Choose a category and explore interesting
                    places in Nashik.
                </p>


                <div className="categories-container">


                    {/* LOADING */}

                    {loading && (

                        <div className="categories-message">

                            <p>
                                Loading categories...
                            </p>

                        </div>

                    )}


                    {/* ERROR */}

                    {!loading && error && (

                        <div className="categories-message">

                            <p>
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={fetchCategories}
                            >
                                Try Again
                            </button>

                        </div>

                    )}


                    {/* CATEGORY CARDS */}

                    {!loading &&
                        !error &&
                        categories.length > 0 &&
                        categories.map((category) => {

                            const categoryId =
                                category._id ||
                                category.id;

                            const categoryName =
                                category.name ||
                                "Category";

                            const categoryDescription =
                                category.description ||
                                `Explore beautiful ${categoryName.toLowerCase()} places and destinations across Nashik.`;

                            return (

                                <Cards
                                    key={categoryId}

                                    title={categoryName}

                                    description={
                                        categoryDescription
                                    }

                                    icon={
                                        categoryIcons[
                                            categoryName
                                        ]
                                    }

                                    buttonText="Explore Category"

                                    onClick={() =>
                                        handleCategoryClick(
                                            categoryId
                                        )
                                    }
                                />

                            );

                        })}


                    {/* NO CATEGORIES */}

                    {!loading &&
                        !error &&
                        categories.length === 0 && (

                            <div className="categories-message">

                                <p>
                                    No categories available.
                                </p>

                                <button
                                    type="button"
                                    onClick={fetchCategories}
                                >
                                    Refresh
                                </button>

                            </div>

                        )}

                </div>

            </section>


            {/* =========================
                WHY NASHIK EXPLORE
            ========================= */}

            <section className="why-section">

                <p className="section-label">
                    WHY NASHIK EXPLORE
                </p>

                <h2>
                    Explore Nashik Easily
                </h2>


                <div className="features-container">


                    <div className="feature-card">

                        <h3>
                            Easy Discovery
                        </h3>

                        <p>
                            Find different tourist places
                            in Nashik according to categories.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            Detailed Information
                        </h3>

                        <p>
                            Get useful information about
                            places before visiting them.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            Explore Nashik
                        </h3>

                        <p>
                            Discover temples, forts, waterfalls,
                            vineyards and beautiful natural places.
                        </p>

                    </div>


                </div>

            </section>


        </div>

    );

}


export default Home;

