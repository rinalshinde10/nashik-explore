
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

import Button from "../../components/Button/Button";

import Heading from "../../components/Heading/Heading";
import "../../components/Heading/Heading.css";

import Cards from "../../components/Cards/Cards";
import "../../components/Cards/Cards.css";

import { getCategories } from "../../services/category_service";


function Home() {

    const navigate = useNavigate();


    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =============================
    // FETCH CATEGORIES
    // =============================

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                setLoading(true);

                setError("");

                const data = await getCategories();

                console.log("Home Categories:", data);

                setCategories(
                    data.categories || []
                );

            } catch (error) {

                console.error(
                    "Error fetching categories:",
                    error.message
                );

                setError(
                    "Unable to load categories."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchCategories();

    }, []);


    // =============================
    // CATEGORY CLICK
    // =============================

    const handleCategoryClick = (categoryId) => {

        navigate(
            `/places?category=${categoryId}`
        );

    };


    return (

        <main className="home">


            {/* ============================= */}
            {/* HERO SECTION */}
            {/* ============================= */}

            <section className="hero-section">

                <div className="hero-content">

                    <p className="hero-tag">
                        EXPLORE • DISCOVER • EXPERIENCE
                    </p>


                    <h1>

                        Discover the Beauty of

                        <span>
                            {" "}Nashik
                        </span>

                    </h1>


                    <p className="hero-description">

                        Explore temples, historical places,
                        waterfalls, vineyards, forts and
                        other beautiful destinations across Nashik.

                    </p>


                    <Button
                        className="explore-button"
                        onClick={() =>
                            navigate("/places")
                        }
                    >
                        Explore Places
                    </Button>

                </div>

            </section>


            {/* ============================= */}
            {/* WELCOME SECTION */}
            {/* ============================= */}

            <section className="welcome-section">

                <p className="section-label">
                    WELCOME TO NASHIK
                </p>


                <Heading
                    title="Explore Nashik Like Never Before"
                    subtitle="Nashik Explore helps you discover tourist attractions, historical places, natural destinations and memorable experiences across Nashik."
                />

            </section>


            {/* ============================= */}
            {/* CATEGORIES SECTION */}
            {/* ============================= */}

            <section className="categories-section">

                <p className="section-label">
                    EXPLORE BY CATEGORY
                </p>


                <Heading
                    title="Discover Places Based on Your Interest"
                    subtitle="Choose a category and explore the different places available in Nashik."
                />


                <div className="categories-container">


                    {/* LOADING */}

                    {loading && (

                        <p className="categories-message">
                            Loading categories...
                        </p>

                    )}


                    {/* ERROR */}

                    {!loading && error && (

                        <p className="categories-message">
                            {error}
                        </p>

                    )}


                    {/* REAL CATEGORIES */}

                    {!loading &&
                        !error &&
                        categories.length > 0 &&

                        categories.map((category) => (

                            <Cards
                                key={category._id}

                                title={category.name}

                                description={
                                    category.description ||
                                    `Explore ${category.name} places in Nashik.`
                                }

                                icon={
                                    category.icon ||
                                    "📍"
                                }

                                buttonText="Explore Category →"

                                onClick={() =>
                                    handleCategoryClick(
                                        category._id
                                    )
                                }
                            />

                        ))
                    }


                    {/* NO CATEGORIES */}

                    {!loading &&
                        !error &&
                        categories.length === 0 && (

                            <p className="categories-message">
                                No categories available.
                            </p>

                        )}

                </div>

            </section>


            {/* ============================= */}
            {/* WHY NASHIK EXPLORE */}
            {/* ============================= */}

            <section className="why-section">

                <p className="section-label">
                    WHY NASHIK EXPLORE?
                </p>


                <Heading
                    title="Everything You Need to Explore Nashik"
                    subtitle="Discover places, explore categories and save your favorite destinations in one place."
                />


                <div className="features-container">


                    <div className="feature-card">

                        <h3>
                            Discover Places
                        </h3>

                        <p>
                            Find temples, historical places,
                            nature spots, forts and other
                            attractions.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            Explore Categories
                        </h3>

                        <p>
                            Find places easily by selecting
                            a category according to your
                            interests.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            Save Favorites
                        </h3>

                        <p>
                            Save your favorite places and
                            access them whenever you want.
                        </p>

                    </div>


                </div>

            </section>


        </main>

    );

}


export default Home;

