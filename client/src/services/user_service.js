import axios from "axios";


const API_URL = "http://localhost:8080/api/users";


// =====================================
// GET MY PROFILE
// =====================================

export const getMyProfile = async () => {

    const token = localStorage.getItem("token");


    const response = await axios.get(
        `${API_URL}/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );


    return response.data;

};


// =====================================
// UPDATE MY PROFILE
// =====================================

export const updateMyProfile = async (userData) => {

    const token = localStorage.getItem("token");


    const response = await axios.put(
        `${API_URL}/profile`,
        userData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );


    return response.data;

};