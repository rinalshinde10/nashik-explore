
import { useEffect, useState } from "react";

import "./Places.css";

import Heading from "../../components/Heading/Heading";
import "../../components/Heading/Heading.css";

import { getPlaces } from "../../services/place_service";

function Places() {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const data = await getPlaces();

            console.log("Places:", data);

            setPlaces(data.places);

        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    return (
        <main className="places-page">

            <section className="places-header">

                <p className="section-label">
                    EXPLORE NASHIK
                </p>

                <Heading
                    title="Discover Places in Nashik"
                    subtitle="Explore temples, historical places, waterfalls, forts, vineyards and other beautiful destinations."
                />

            </section>

            <section className="places-content">

                <div className="places-grid">

                    {places.map((place) => (

                        <div className="place-card" key={place._id}>

                            <div className="place-card-content">

                                <h2>
                                    {place.name}
                                </h2>

                                <p className="place-category">
                                    {place.category?.name}
                                </p>

                                <p className="place-description">
                                    {place.description}
                                </p>

                                <p className="place-location">
                                    {place.location}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </main>
    );
}

export default Places;

