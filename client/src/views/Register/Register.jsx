import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import "./Register.css";

import showIcon from "../../assets/Icons/show.png";
import blindIcon from "../../assets/Icons/blind.png";

import { registerUser } from "../../services/auth_service";


function Register() {

    const navigate = useNavigate();


    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // =============================
    // REGISTER
    // =============================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");


        // =============================
        // VALIDATION
        // =============================

        if (
            !name.trim() ||
            !email.trim() ||
            !password
        ) {

            setError(
                "Please enter all fields"
            );

            return;

        }


        if (password.length < 6) {

            setError(
                "Password must be at least 6 characters"
            );

            return;

        }


        try {

            setLoading(true);


            // =============================
            // REGISTER API
            // =============================

            await registerUser({

                name: name.trim(),

                email: email.trim(),

                password: password

            });


            // =============================
            // SUCCESS
            // =============================

            setMessage(
                "Registration successful! Redirecting to login..."
            );


            setName("");

            setEmail("");

            setPassword("");

            setShowPassword(false);


            // =============================
            // GO TO LOGIN
            // =============================

            setTimeout(() => {

                navigate("/login");

            }, 1000);


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Registration failed. Please try again.";


            setError(errorMessage);


        } finally {

            setLoading(false);

        }

    };


    // =============================
    // PASSWORD SHOW / HIDE
    // =============================

    const togglePassword = () => {

        setShowPassword(
            (previousValue) => !previousValue
        );

    };


    return (

        <main className="register-page">

            <div className="register-card">


                {/* TITLE */}

                <h1>
                    Create Account
                </h1>


                <p className="register-subtitle">
                    Register to explore Nashik
                </p>


                {/* ERROR */}

                {error && (

                    <p className="register-error">
                        {error}
                    </p>

                )}


                {/* SUCCESS */}

                {message && (

                    <p className="register-success">
                        {message}
                    </p>

                )}


                {/* FORM */}

                <form onSubmit={handleSubmit}>


                    {/* NAME */}

                    <div className="form-group">

                        <label htmlFor="name">
                            Name
                        </label>


                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            autoComplete="name"
                            disabled={loading}
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>


                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            autoComplete="email"
                            disabled={loading}
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="form-group">

                        <label htmlFor="register-password">
                            Password
                        </label>


                        <div className="password-input-wrapper">

                            <input
                                id="register-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                autoComplete="new-password"
                                disabled={loading}
                            />


                            {/* SHOW / HIDE ICON */}

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePassword}
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
                                            ? showIcon
                                            : blindIcon
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


                    {/* REGISTER BUTTON */}

                    <Button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Registering..."
                            : "Register"
                        }

                    </Button>


                </form>


                {/* LOGIN LINK */}

                <p className="login-link">

                    Already have an account?{" "}

                    <span
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </span>

                </p>


            </div>

        </main>

    );

}


export default Register;