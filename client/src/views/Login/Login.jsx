
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import { loginUser } from "../../services/auth_service";

import showIcon from "../../assets/icons/show.png";
import blindIcon from "../../assets/icons/blind.png";

import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // =====================================
    // LOGIN
    // =====================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        // Validation
        if (!email.trim() || !password) {
            setError(
                "Please enter email and password."
            );
            return;
        }

        try {
            setLoading(true);

            // Login API
            const data = await loginUser({
                email: email.trim(),
                password: password
            });

            // Save token
            localStorage.setItem(
                "token",
                data.token
            );

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // Update navbar login status
            window.dispatchEvent(
                new Event("authChanged")
            );

            // Go to places/search page
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

    // =====================================
    // SHOW / HIDE PASSWORD
    // =====================================

    const togglePassword = () => {
        setShowPassword(
            (previousValue) => !previousValue
        );
    };

    return (
        <main className="login-page">

            <div className="login-card">

                <h1>
                    Login
                </h1>

                <p className="login-subtitle">
                    Login to explore Nashik places
                </p>

                {/* ERROR */}

                {error && (
                    <p className="login-error">
                        {error}
                    </p>
                )}

                {/* FORM */}

                <form onSubmit={handleSubmit}>

                    {/* EMAIL */}

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

                    {/* PASSWORD */}

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

                    {/* LOGIN BUTTON */}

                    <Button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </Button>

                </form>

            </div>

        </main>
    );
}

export default Login;

