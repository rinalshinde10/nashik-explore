
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css";

const API_URL = "http://localhost:8080/api/auth/register";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");


        if (!name || !email || !password) {

            setError("Please enter all fields");

            return;
        }


        if (password.length < 6) {

            setError("Password must be at least 6 characters");

            return;
        }


        try {

            setLoading(true);


            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            });


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message || "Registration failed"
                );
            }


            setMessage(
                "Registration successful! Redirecting to login..."
            );


            setName("");
            setEmail("");
            setPassword("");


            setTimeout(() => {

                navigate("/login");

            }, 1000);


        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="register-page">

            <div className="register-card">

                <h1>Create Account</h1>

                <p className="register-subtitle">
                    Register to explore Nashik
                </p>


                {error && (
                    <p className="register-error">
                        {error}
                    </p>
                )}


                {message && (
                    <p className="register-success">
                        {message}
                    </p>
                )}


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Registering..."
                            : "Register"
                        }

                    </button>

                </form>


                <p className="login-link">

                    Already have an account?{" "}

                    <span
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>

                </p>

            </div>

        </main>

    );

}


export default Register;

