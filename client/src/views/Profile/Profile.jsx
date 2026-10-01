import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import {
    getMyProfile,
    updateMyProfile
} from "../../services/user_service";

import "./Profile.css";


function Profile() {

    const navigate = useNavigate();


    const [user, setUser] = useState(null);

    const [name, setName] = useState("");

    const [profileImage, setProfileImage] = useState("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =====================================
    // FETCH PROFILE
    // =====================================

    const fetchProfile = async () => {

        try {

            setLoading(true);

            setError("");


            const token =
                localStorage.getItem("token");


            if (!token) {

                navigate("/login");

                return;

            }


            const data =
                await getMyProfile();


            const currentUser =
                data.user;


            setUser(currentUser);

            setName(
                currentUser?.name || ""
            );

            setProfileImage(
                currentUser?.profileImage || ""
            );


        } catch (error) {

            console.error(
                "Profile error:",
                error
            );


            const message =
                error.response?.data?.message ||
                error.message ||
                "Unable to load profile.";


            setError(message);


            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {

                localStorage.removeItem("token");

                localStorage.removeItem("user");


                window.dispatchEvent(
                    new Event("authChanged")
                );


                navigate("/login");

            }

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // INITIAL LOAD
    // =====================================

    useEffect(() => {

        fetchProfile();

        window.scrollTo(0, 0);

    }, []);


    // =====================================
    // UPDATE PROFILE
    // =====================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        setError("");

        setSuccess("");


        const trimmedName =
            name.trim();


        if (!trimmedName) {

            setError(
                "Name cannot be empty."
            );

            return;

        }


        try {

            setSaving(true);


            const data =
                await updateMyProfile({

                    name: trimmedName,

                    profileImage:
                        profileImage.trim()

                });


            const updatedUser =
                data.user;


            setUser(updatedUser);

            setName(
                updatedUser?.name || ""
            );

            setProfileImage(
                updatedUser?.profileImage || ""
            );


            // Keep local user data updated

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );


            window.dispatchEvent(
                new Event("authChanged")
            );


            setSuccess(
                "Profile updated successfully."
            );


        } catch (error) {

            console.error(
                "Update profile error:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to update profile."
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================
    // LOGOUT
    // =====================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");


        window.dispatchEvent(
            new Event("authChanged")
        );


        navigate("/login");

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <main className="profile-page">

                <div className="profile-message">

                    Loading profile...

                </div>

            </main>

        );

    }


    // =====================================
    // JSX
    // =====================================

    return (

        <main className="profile-page">


            <section className="profile-card">


                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="profile-header">

                    <p className="section-label">
                        MY ACCOUNT
                    </p>


                    <h1>
                        My Profile
                    </h1>


                    <p>
                        Manage your Nashik Explore account.
                    </p>

                </div>


                {/* ================================= */}
                {/* PROFILE IMAGE */}
                {/* ================================= */}

                <div className="profile-avatar">

                    {profileImage ? (

                        <img
                            src={profileImage}
                            alt="Profile"
                            onError={(event) => {
                                event.currentTarget.style.display =
                                    "none";
                            }}
                        />

                    ) : (

                        <span>
                            {(
                                name ||
                                "U"
                            )
                                .charAt(0)
                                .toUpperCase()}
                        </span>

                    )}

                </div>


                {/* ================================= */}
                {/* USER INFORMATION */}
                {/* ================================= */}

                {user && (

                    <div className="profile-info">

                        <p>
                            <strong>Email:</strong>{" "}
                            {user.email}
                        </p>


                        <p>
                            <strong>Role:</strong>{" "}
                            {user.role || "user"}
                        </p>

                    </div>

                )}


                {/* ================================= */}
                {/* ERROR */}
                {/* ================================= */}

                {error && (

                    <div className="profile-error">

                        {error}

                    </div>

                )}


                {/* ================================= */}
                {/* SUCCESS */}
                {/* ================================= */}

                {success && (

                    <div className="profile-success">

                        {success}

                    </div>

                )}


                {/* ================================= */}
                {/* EDIT FORM */}
                {/* ================================= */}

                <form
                    className="profile-form"
                    onSubmit={handleSubmit}
                >


                    {/* NAME */}

                    <div className="profile-field">

                        <label htmlFor="profile-name">
                            Name
                        </label>


                        <input
                            id="profile-name"
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            disabled={saving}
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="profile-field">

                        <label htmlFor="profile-email">
                            Email
                        </label>


                        <input
                            id="profile-email"
                            type="email"
                            value={
                                user?.email || ""
                            }
                            disabled
                        />

                    </div>


                    {/* PROFILE IMAGE */}

                    <div className="profile-field">

                        <label htmlFor="profile-image">
                            Profile Image URL
                        </label>


                        <input
                            id="profile-image"
                            type="url"
                            value={profileImage}
                            placeholder="https://example.com/image.jpg"
                            onChange={(event) =>
                                setProfileImage(
                                    event.target.value
                                )
                            }
                            disabled={saving}
                        />

                    </div>


                    {/* SAVE */}

                    <Button
                        type="submit"
                        disabled={saving}
                    >

                        {saving
                            ? "Saving..."
                            : "Save Changes"
                        }

                    </Button>

                </form>


                {/* ================================= */}
                {/* ACTIONS */}
                {/* ================================= */}

                <div className="profile-actions">


                    <Button
                        onClick={() =>
                            navigate("/favorites")
                        }
                    >
                        My Favorites
                    </Button>


                    <Button
                        className="profile-logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>


                </div>

            </section>

        </main>

    );

}


export default Profile;