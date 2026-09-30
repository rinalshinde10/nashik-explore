import "./Home.css";

function Home() {
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

                    <button className="explore-button">
                        Explore Places
                    </button>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="welcome-section">
                <p className="section-label">
                    WELCOME TO NASHIK
                </p>

                <h2>
                    Explore Nashik Like Never Before
                </h2>

                <p className="welcome-description">
                    Nashik Explore helps you discover tourist attractions,
                    historical places, natural destinations and memorable
                    experiences across Nashik. Explore different categories
                    and find places according to your interests.
                </p>
            </section>

            {/* Explore Categories Section */}
            <section className="categories-section">
                <p className="section-label">
                    EXPLORE BY CATEGORY
                </p>

                <h2>
                    Discover Places Based on Your Interest
                </h2>

                <p className="section-description">
                    Choose a category and explore the different places
                    available in Nashik.
                </p>

                <div className="categories-container">

                    {/* Category 1 */}
                    <div className="category-card">
                        <div className="category-icon">
                            🛕
                        </div>

                        <h3>
                            Religious Places
                        </h3>

                        <p>
                            Explore famous temples and spiritual
                            destinations in Nashik.
                        </p>

                        <button className="category-button">
                            Explore Category →
                        </button>
                    </div>

                    {/* Category 2 */}
                    <div className="category-card">
                        <div className="category-icon">
                            🏛️
                        </div>

                        <h3>
                            Historical Places
                        </h3>

                        <p>
                            Discover ancient caves, monuments and
                            historically important places.
                        </p>

                        <button className="category-button">
                            Explore Category →
                        </button>
                    </div>

                    {/* Category 3 */}
                    <div className="category-card">
                        <div className="category-icon">
                            🌿
                        </div>

                        <h3>
                            Nature & Waterfalls
                        </h3>

                        <p>
                            Visit beautiful waterfalls, natural spots
                            and peaceful destinations.
                        </p>

                        <button className="category-button">
                            Explore Category →
                        </button>
                    </div>

                    {/* Category 4 */}
                    <div className="category-card">
                        <div className="category-icon">
                            🏰
                        </div>

                        <h3>
                            Forts
                        </h3>

                        <p>
                            Explore famous forts and trekking destinations
                            around Nashik.
                        </p>

                        <button className="category-button">
                            Explore Category →
                        </button>
                    </div>

                    {/* Category 5 */}
                    <div className="category-card">
                        <div className="category-icon">
                            🍇
                        </div>

                        <h3>
                            Vineyards
                        </h3>

                        <p>
                            Discover vineyards and scenic destinations
                            around Nashik.
                        </p>

                        <button className="category-button">
                            Explore Category →
                        </button>
                    </div>

                    {/* Category 6 */}
                    <div className="category-card">
                        <div className="category-icon">
                            🏺
                        </div>

                        <h3>
                            Museums
                        </h3>

                        <p>
                            Learn about Nashik's culture, history and
                            interesting collections.
                        </p>

                        <button className="category-button">
                            Explore Category →
                        </button>
                    </div>

                </div>
            </section>

            {/* Why Nashik Explore */}
            <section className="why-section">
                <p className="section-label">
                    WHY NASHIK EXPLORE?
                </p>

                <h2>
                    Everything You Need to Explore Nashik
                </h2>

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