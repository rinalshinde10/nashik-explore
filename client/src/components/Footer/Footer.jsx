
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">

            {/* ============================= */}
            {/* FOOTER MAIN CONTENT */}
            {/* ============================= */}

            <div className="footer-content">

                {/* PROJECT INFORMATION */}
                <div className="footer-about">

                    <h2>Nashik Explore</h2>

                    <p>
                        Explore the beautiful places of Nashik,
                        discover new destinations and create
                        memorable travel experiences.
                    </p>

                </div>


                {/* QUICK LINKS */}
                <div className="footer-links">

                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>

                    <Link to="/places">Places</Link>

                    <Link to="/about">About</Link>

                    <Link to="/contact">Contact</Link>

                </div>


                {/* CONTACT */}
                <div className="footer-contact">

                    <h3>Contact Us</h3>

                    <p>
                        <strong>Phone:</strong> +91 98765 43210
                    </p>

                    <p>
                        <strong>Email:</strong> nashikexplore@gmail.com
                    </p>

                    <p>
                        <strong>Location:</strong> Nashik, Maharashtra, India
                    </p>

                </div>

            </div>


            {/* ============================= */}
            {/* COPYRIGHT */}
            {/* ============================= */}

            <div className="footer-bottom">

                <p className="text">
                    © {new Date().getFullYear()} Flora Explorer. All rights reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;

