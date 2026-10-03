
import axios from "axios";

const API_URL ="https://nashik-explore-api.onrender.com/api/auth";


// =============================
// LOGIN USER
// =============================

export const loginUser = async (userData) => {

    const response = await axios.post(
        `${API_URL}/login`,
        userData
    );

    const data = response.data;


    // Save login information
    if (data.token) {

        localStorage.setItem(
            "token",
            data.token
        );
    }


    if (data.user) {

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );
    }


    // Notify Navbar about login
    window.dispatchEvent(
        new Event("authChanged")
    );


    return data;
};


// =============================
// REGISTER USER
// =============================

export const registerUser = async (userData) => {

    const response = await axios.post(
        `${API_URL}/register`,
        userData
    );

    return response.data;
};


// =============================
// LOGOUT USER
// =============================

export const logoutUser = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");


    // Notify Navbar about logout
    window.dispatchEvent(
        new Event("authChanged")
    );
};


// =============================
// CHECK LOGIN STATUS
// =============================

export const isLoggedIn = () => {

    return !!localStorage.getItem("token");

};


// =============================
// GET CURRENT USER
// =============================

export const getCurrentUser = () => {

    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {

        return JSON.parse(user);

    } catch (error) {

        console.error(
            "Error reading user data:",
            error
        );

        return null;
    }
};

