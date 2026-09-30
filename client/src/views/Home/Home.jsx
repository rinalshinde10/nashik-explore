import "./Home.css";
import Button from "../../components/Button/Button";

import { useNavigate } from "react-router-dom";

import Heading from "../../components/Heading/Heading";
import "../../components/Heading/Heading.css";

import Cards from "../../components/Cards/Cards";
import "../../components/Cards/Cards.css";

function Home() {

    const navigate = useNavigate();

    return (
        <main className="home">

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">

                    <p className="hero-tag">
                        EXPLORE • DISCOVER • EXPERIENCE
                    </p>

                    <h1>
                        Discover the Beauty of
                        <span> Nashik</span>
                    </h1>

                    <p className="hero-description">
                        Explore temples, historical places, waterfalls,
                        vineyards, forts and other beautiful destinations
                        across Nashik.
                    </p>

                   <Button
    className="explore-button"
    onClick={() => navigate("/places")}
>
    Explore Places
</Button>

                </div>
            </section>


            {/* Welcome Section */}
            <section className="welcome-section">

                <p className="section-label">
                    WELCOME TO NASHIK
                </p>

                <Heading
                    title="Explore Nashik Like Never Before"
                    subtitle="Nashik Explore helps you discover tourist attractions, historical places, natural destinations and memorable experiences across Nashik."
                />

            </section>


            {/* Explore Categories Section */}
            <section className="categories-section">

                <p className="section-label">
                    EXPLORE BY CATEGORY
                </p>

                <Heading
                    title="Discover Places Based on Your Interest"
                    subtitle="Choose a category and explore the different places available in Nashik."
                />

                <div className="categories-container">

                    <Cards
                        title="Religious Places"
                        description="Explore famous temples and spiritual destinations in Nashik."
                        icon="🛕"
                        buttonText="Explore Category →"
                    />

                    <Cards
                        title="Historical Places"
                        description="Discover ancient caves, monuments and historically important places."
                        icon="🏛️"
                        buttonText="Explore Category →"
                    />

                    <Cards
                        title="Nature & Waterfalls"
                        description="Visit beautiful waterfalls, natural spots and peaceful destinations."
                        icon="🌿"
                        buttonText="Explore Category →"
                    />

                    <Cards
                        title="Forts"
                        description="Explore famous forts and trekking destinations around Nashik."
                        icon="🏰"
                        buttonText="Explore Category →"
                    />

                    <Cards
                        title="Vineyards"
                        description="Discover vineyards and scenic destinations around Nashik."
                        icon="🍇"
                        buttonText="Explore Category →"
                    />

                    <Cards
                        title="Museums"
                        description="Learn about Nashik's culture, history and interesting collections."
                        icon="🏺"
                        buttonText="Explore Category →"
                    />

                </div>

            </section>


            {/* Why Nashik Explore */}
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
                            Find temples, historical places, nature spots,
                            forts and other attractions.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            Explore Categories
                        </h3>

                        <p>
                            Find places easily by selecting a category
                            according to your interests.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            Save Favorites
                        </h3>

                        <p>
                            Save your favorite places and access them
                            whenever you want.
                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Home;