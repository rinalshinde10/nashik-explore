
import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/Button/Button";

import { loginUser } from "../../services/auth_service";

import showIcon from "../../assets/Icons/show.png";
import blindIcon from "../../assets/Icons/blind.png";


function Login() {
useEffect(() => {
    window.scrollTo(0, 0);
}, []);
    const navigate = useNavigate();


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // =============================
    // LOGIN
    // =============================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        // =============================
        // VALIDATION
        // =============================

        if (!email.trim() || !password) {

            setError(
                "Please enter email and password"
            );

            return;

        }


        try {

            setLoading(true);


            // =============================
            // LOGIN API
            // =============================

            const data = await loginUser({

                email: email.trim(),

                password: password

            });


            // =============================
            // SAVE TOKEN
            // =============================

            localStorage.setItem(
                "token",
                data.token
            );


            // =============================
            // SAVE USER
            // =============================

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            // =============================
            // UPDATE NAVBAR LOGIN STATUS
            // =============================

            window.dispatchEvent(
                new Event("authChanged")
            );


            console.log(
                "Login successful"
            );


            // =============================
            // GO TO PLACES
            // =============================

            navigate("/places");


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            const message =
                error.response?.data?.message ||
                error.message ||
                "Login failed. Please try again.";


            setError(message);


        } finally {

            setLoading(false);

        }

    };


    // =============================
    // TOGGLE PASSWORD
    // =============================

    const togglePassword = () => {

        setShowPassword(
            (previousValue) => !previousValue
        );

    };


    return (

        <main className="login-page">


            <div className="login-card">


                {/* ============================= */}
                {/* TITLE */}
                {/* ============================= */}

                <h1>
                    Login
                </h1>


                <p className="login-subtitle">
                    Login to explore Nashik places
                </p>


                {/* ============================= */}
                {/* ERROR */}
                {/* ============================= */}

                {error && (

                    <p className="login-error">
                        {error}
                    </p>

                )}


                {/* ============================= */}
                {/* LOGIN FORM */}
                {/* ============================= */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* ============================= */}
                    {/* EMAIL */}
                    {/* ============================= */}

                    <div className="login-field">

                        <label htmlFor="email">
                            Email
                        </label>


                        <input
                            id="email"

                            type="email"

                            placeholder="Enter your email"

                            value={email}

                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }

                            autoComplete="email"

                            disabled={loading}
                        />

                    </div>


                    {/* ============================= */}
                    {/* PASSWORD */}
                    {/* ============================= */}

                    <div className="login-field">

                        <label htmlFor="password">
                            Password
                        </label>


                        <div className="password-input-wrapper">

                            <input
                                id="password"

                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                placeholder="Enter your password"

                                value={password}

                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }

                                autoComplete="current-password"

                                disabled={loading}
                            />


                            {/* PASSWORD EYE BUTTON */}

                            <button
                                type="button"

                                className="password-toggle"

                                onClick={
                                    togglePassword
                                }

                                disabled={loading}

                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >

                                <img
                                    src={
                                        showPassword
                                            ? blindIcon
                                            : showIcon
                                    }

                                    alt={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                />

                            </button>

                        </div>

                    </div>


                    {/* ============================= */}
                    {/* LOGIN BUTTON */}
                    {/* ============================= */}

                    <Button
                        type="submit"

                        className="login-button"

                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </Button>


                </form>


            </div>


        </main>

    );

}


export default Login;

