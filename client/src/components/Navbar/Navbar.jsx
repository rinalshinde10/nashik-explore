
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

import Button from "../../components/Button/Button";

import {
    logoutUser
} from "../../services/auth_service";

function Navbar() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    // =====================================
    // CHECK AUTH STATUS
    // =====================================

    useEffect(() => {

        const checkLoginStatus = () => {

            setIsLoggedIn(
                !!localStorage.getItem("token")
            );

        };

        window.addEventListener(
            "authChanged",
            checkLoginStatus
        );

        window.addEventListener(
            "storage",
            checkLoginStatus
        );

        window.addEventListener(
            "focus",
            checkLoginStatus
        );

        return () => {

            window.removeEventListener(
                "authChanged",
                checkLoginStatus
            );

            window.removeEventListener(
                "storage",
                checkLoginStatus
            );

            window.removeEventListener(
                "focus",
                checkLoginStatus
            );

        };

    }, []);

    // =====================================
    // LOGIN
    // =====================================

    const handleLogin = () => {

        navigate("/login");

    };

    // =====================================
    // LOGOUT
    // =====================================

    const handleLogout = () => {

        logoutUser();

        setIsLoggedIn(false);

        navigate("/");

    };

    // =====================================
    // JSX
    // =====================================

    return (

        <nav className="navbar">

            {/* LOGO */}

            <Link
                to="/"
                className="navbar-logo"
            >
                <span className="navbar-logo-text1">
                    Nashik
                </span>

                <span>
                    Explore
                </span>
            </Link>

            {/* NAVIGATION */}

            <div className="navbar-links">

                {/* HOME */}

                <Link to="/">
                    Home
                </Link>

                {/* ABOUT */}

                <Link to="/about">
                    About
                </Link>

                {/* ============================= */}
                {/* LOGGED IN */}
                {/* ============================= */}

                {isLoggedIn && (

                    <>
                        <Link to="/places">
                            Places
                        </Link>

                        <Button
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </>

                )}

                {/* ============================= */}
                {/* LOGGED OUT */}
                {/* ============================= */}

                {!isLoggedIn && (

                    <Button
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                )}

            </div>

        </nav>

    );
}

export default Navbar;

