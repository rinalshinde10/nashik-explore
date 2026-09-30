import "./Home.css";

function Home() {
    return (
        <main className="home">

            {/* Hero Section */}
            <section className="hero-section">
                <h1>Nashik Explore</h1>

                <p>
                    Discover beautiful places and attractions in Nashik.
                </p>

                <button className="explore-button">
                    Explore Places
                </button>
            </section>

            {/* Welcome Section */}
            <section className="welcome-section">
                <h2>Welcome to Nashik Explore</h2>

                <p>
                    Find the best places to visit in Nashik and discover
                    new experiences across the city.
                </p>
            </section>

            {/* Popular Places Section */}
            <section className="popular-section">
                <h2>Popular Places in Nashik</h2>

                <p className="section-description">
                    Explore some of the famous tourist places and attractions
                    in Nashik.
                </p>

                <div className="places-container">

                    {/* Place Card 1 */}
                    <div className="place-card">
                        <h3>Trimbakeshwar Temple</h3>

                        <p>
                            One of the famous temples near Nashik and an
                            important religious destination.
                        </p>

                        <button className="view-button">
                            View Details
                        </button>
                    </div>

                    {/* Place Card 2 */}
                    <div className="place-card">
                        <h3>Pandavleni Caves</h3>

                        <p>
                            Ancient Buddhist caves located on a hill and
                            known for their historical importance.
                        </p>

                        <button className="view-button">
                            View Details
                        </button>
                    </div>

                    {/* Place Card 3 */}
                    <div className="place-card">
                        <h3>Sula Vineyards</h3>

                        <p>
                            A popular tourist destination known for its
                            scenic surroundings and vineyard experience.
                        </p>

                        <button className="view-button">
                            View Details
                        </button>
                    </div>

                </div>
            </section>

        </main>
    );
}

export default Home;