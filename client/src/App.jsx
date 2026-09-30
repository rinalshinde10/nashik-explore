import "./App.css";

function App() {
    return (
        <div className="app">
            <nav className="navbar">
                <div className="logo">
                    Nashik Explore
                </div>

                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="/">Explore Places</a>
                    <a href="/">Categories</a>
                    <a href="/">Favorites</a>
                    <a href="/">About</a>
                    <a href="/">Login</a>
                </div>
            </nav>

            <main>
                <section className="hero-section">
                    <h1>Explore Nashik</h1>

                    <p>
                        Discover beautiful places, temples,
                        attractions and experiences in Nashik.
                    </p>

                    <button>
                        Explore Places
                    </button>
                </section>

                <section className="welcome-section">
                    <h2>Welcome to Nashik Explore</h2>

                    <p>
                        Find the best places to visit in Nashik,
                        read reviews and ratings, and save your
                        favorite places.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default App;