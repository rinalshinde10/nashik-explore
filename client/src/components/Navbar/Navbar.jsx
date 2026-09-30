
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";


function Navbar() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // =============================
    // CHECK LOGIN
    // =============================

    useEffect(() => {

        const token = localStorage.getItem("token");

        setIsLoggedIn(!!token);

    }, []);


    // =============================
    // LOGOUT
    // =============================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setIsLoggedIn(false);

        navigate("/login");

    };


    return (

        <nav className="navbar">

            {/* LOGO */}

            <Link
                to="/"
                className="navbar-logo"
            >
                Nashik Explore
            </Link>


            {/* NAVIGATION */}

            <div className="navbar-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/places">
                    Places
                </Link>


                {!isLoggedIn ? (

                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="register-nav-button"
                        >
                            Register
                        </Link>
                    </>

                ) : (

                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                )}

            </div>

        </nav>

    );

}


export default Navbar;

