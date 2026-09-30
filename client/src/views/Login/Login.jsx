
import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ================================
    // LOGIN
    // ================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        if (!email || !password) {

            setError("Please enter email and password");

            return;
        }


        try {

            setLoading(true);


            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message || "Login failed"
                );
            }


            // ================================
            // SAVE JWT TOKEN
            // ================================

            localStorage.setItem(
                "token",
                data.token
            );


            // ================================
            // SAVE USER
            // ================================

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            console.log("Login successful");

            console.log(
                "Token saved:",
                data.token
            );


            // ================================
            // GO TO PLACES
            // ================================

            navigate("/places");


        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            setError(error.message);


        } finally {

            setLoading(false);

        }

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


                <form onSubmit={handleSubmit}>


                    {/* EMAIL */}

                    <div className="login-field">

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


                    {/* PASSWORD */}

                    <div className="login-field">

                        <label>
                            Password
                        </label>


                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />

                    </div>


                    {/* COMMON BUTTON */}

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

