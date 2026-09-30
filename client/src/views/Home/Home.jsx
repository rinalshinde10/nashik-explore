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

        </main>
    );
}

export default Home;