import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import "./Admin.css";


function Admin() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [admin, setAdmin] = useState(null);


    // =====================================
    // CHECK ADMIN ACCESS
    // =====================================

    useEffect(() => {

        const checkAdminAccess = async () => {

            const token = localStorage.getItem("token");

            if (!token) {

                navigate("/login");

                return;

            }


            try {

                setLoading(true);
                setError("");


                const response = await fetch(
                    "http://localhost:8080/api/admin/dashboard",
                    {
                        method: "GET",

                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );


                const data = await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Admin access denied"
                    );

                }


                setAdmin(data.admin);


            } catch (error) {

                console.error(
                    "Admin access error:",
                    error
                );


                setError(
                    error.message ||
                    "Unable to access admin dashboard"
                );


                if (
                    error.message ===
                    "Authentication required"
                ) {

                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    navigate("/login");

                }

            } finally {

                setLoading(false);

            }

        };


        checkAdminAccess();

    }, [navigate]);


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <main className="admin-page">

                <div className="admin-message">

                    <h2>
                        Loading Admin Dashboard...
                    </h2>

                </div>

            </main>

        );

    }


    // =====================================
    // ERROR
    // =====================================

    if (error) {

        return (

            <main className="admin-page">

                <div className="admin-message">

                    <h2>
                        Access Denied
                    </h2>

                    <p>
                        {error}
                    </p>


                    <Button
                        onClick={() =>
                            navigate("/places")
                        }
                    >
                        Back to Places
                    </Button>

                </div>

            </main>

        );

    }


    // =====================================
    // ADMIN DASHBOARD
    // =====================================

    return (

        <main className="admin-page">

            <section className="admin-header">

                <h1>
                    Admin Dashboard
                </h1>

                <p>
                    Manage Nashik Explore
                </p>

            </section>


            <section className="admin-content">

                <div className="admin-welcome">

                    <h2>
                        Welcome, Admin
                    </h2>

                    <p>
                        You have successfully accessed
                        the admin dashboard.
                    </p>

                    {admin && (

                        <div className="admin-info">

                            <p>
                                <strong>
                                    Admin ID:
                                </strong>{" "}
                                {admin.id}
                            </p>

                            <p>
                                <strong>
                                    Role:
                                </strong>{" "}
                                {admin.role}
                            </p>

                        </div>

                    )}

                </div>


                {/* ================================= */}
                {/* FUTURE ADMIN MODULES */}
                {/* ================================= */}

                <div className="admin-cards">

                    <div className="admin-card">

                        <h3>
                            Manage Places
                        </h3>

                        <p>
                            Add, edit and delete Nashik
                            tourist places.
                        </p>

                    </div>


                    <div className="admin-card">

                        <h3>
                            Manage Categories
                        </h3>

                        <p>
                            Manage place categories.
                        </p>

                    </div>


                    <div className="admin-card">

                        <h3>
                            Manage Users
                        </h3>

                        <p>
                            View and manage registered users.
                        </p>

                    </div>


                    <div className="admin-card">

                        <h3>
                            Manage Reviews
                        </h3>

                        <p>
                            Monitor user reviews and ratings.
                        </p>

                    </div>

                </div>

            </section>

        </main>

    );

}


export default Admin;