
import "./About.css";

import Heading from "../../components/Heading/Heading";
import Cards from "../../components/Cards/Cards";
import "../../components/Cards/Cards.css";

import { useEffect } from "react";


import DiscoverIcon from "../../assets/icons/discover.png";
import SearchIcon from "../../assets/icons/search.png";
import RatingsIcon from "../../assets/icons/rating.png";
import FavoritesIcon from "../../assets/icons/favorite.png";


function About() {


    useEffect(() => {
    window.scrollTo(0, 0);
}, []);

    const features = [
        {
            title: "Discover Places",
            description:
                "Explore temples, forts, waterfalls, historical places, vineyards and other beautiful destinations in Nashik.",
            icon: DiscoverIcon
        },
        {
            title: "Search & Filter",
            description:
                "Easily search places by name and filter them according to their category.",
            icon: SearchIcon
        },
        {
            title: "Ratings & Reviews",
            description:
                "Share your experience by rating places and see ratings from other visitors.",
            icon: RatingsIcon
        },
        {
            title: "Favorites",
            description:
                "Save your favorite Nashik places and quickly access them whenever you want.",
            icon: FavoritesIcon
        }
    ];


    return (

        <main className="about-page">


            {/* ============================= */}
            {/* ABOUT HEADER */}
            {/* ============================= */}

            <section className="about-header">

                <p className="section-label">
                    ABOUT NASHIK EXPLORE
                </p>

                <Heading
                    title="Explore Nashik With Us"
                    subtitle="Discover beautiful places, cultural attractions and memorable destinations across Nashik."
                />

            </section>


            {/* ============================= */}
            {/* ABOUT INTRODUCTION */}
            {/* ============================= */}

            <section className="about-intro">

                <div className="about-intro-content">

                    <h2>
                        Welcome to Nashik Explore
                    </h2>

                    <p>
                        Nashik Explore is a tourism platform designed
                        to help visitors discover interesting and
                        beautiful places in Nashik.
                    </p>

                    <p>
                        From ancient temples and historical forts to
                        waterfalls, vineyards and peaceful destinations,
                        the platform brings different places together
                        in one convenient place.
                    </p>

                    <p>
                        Users can search for places, explore categories,
                        view important place information, save favorite
                        destinations and share ratings.
                    </p>

                </div>

            </section>


            {/* ============================= */}
            {/* FEATURES */}
            {/* ============================= */}

            <section className="about-features">

                <Heading
                    title="What You Can Do"
                    subtitle="Useful features that make exploring Nashik easier."
                />


                <div className="about-cards">

                    {features.map((feature, index) => (

                        <Cards
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                        />

                    ))}

                </div>

            </section>


            {/* ============================= */}
            {/* WHY NASHIK EXPLORE */}
            {/* ============================= */}

            <section className="about-purpose">

                <div className="about-purpose-content">

                    <h2>
                        Why Nashik Explore?
                    </h2>

                    <p>
                        Nashik has many destinations that are worth
                        visiting, but finding information about them
                        can sometimes be difficult.
                    </p>

                    <p>
                        Nashik Explore provides a simple and organized
                        way to discover these destinations and helps
                        users decide which places they would like to
                        visit.
                    </p>

                    <p className="about-highlight">
                        Discover Nashik. Explore More. Create Memories.
                    </p>

                </div>

            </section>


        </main>

    );


}

export default About;

