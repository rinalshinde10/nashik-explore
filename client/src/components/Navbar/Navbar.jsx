
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


    // =============================
    // CHECK AUTH STATUS
    // =============================

    useEffect(() => {

        const checkLoginStatus = () => {

            setIsLoggedIn(
                !!localStorage.getItem("token")
            );

        };


        // Login / Logout event
        window.addEventListener(
            "authChanged",
            checkLoginStatus
        );


        // Browser storage change
        window.addEventListener(
            "storage",
            checkLoginStatus
        );


        // Check when window becomes active
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


    // =============================
    // LOGIN
    // =============================

    const handleLogin = () => {

        navigate("/login");

    };


    // =============================
    // REGISTER
    // =============================

    const handleRegister = () => {

        navigate("/register");

    };


    // =============================
    // LOGOUT
    // =============================

    const handleLogout = () => {

        logoutUser();

        setIsLoggedIn(false);

        navigate("/login");

    };


    // =============================
    // JSX
    // =============================

    return (

        <nav className="navbar">


            {/* ============================= */}
            {/* LOGO */}
            {/* ============================= */}

            <Link
                to="/"
                className="navbar-logo"
            >
                Nashik Explore
            </Link>


            {/* ============================= */}
            {/* NAVIGATION */}
            {/* ============================= */}

            <div className="navbar-links">


                {/* HOME */}

                <Link to="/">
                    Home
                </Link>


                {/* PLACES */}

                <Link to="/places">
                    Places
                </Link>


                {/* ============================= */}
                {/* LOGGED OUT */}
                {/* ============================= */}

                {!isLoggedIn && (

                    <>

                        <Button
                            onClick={handleLogin}
                        >
                            Login
                        </Button>


                        <Button
                            onClick={handleRegister}
                        >
                            Register
                        </Button>

                    </>

                )}


                {/* ============================= */}
                {/* LOGGED IN */}
                {/* ============================= */}

                {isLoggedIn && (

                    <Button
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                )}

            </div>

        </nav>

    );

}


export default Navbar;

