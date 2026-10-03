
import axios from "axios";

const API_URL = "https://nashik-explore-api.onrender.com/api/places";

export const getPlaces = async (params = {}) => {
    const response = await axios.get(API_URL, {
        params: params
    });

    return response.data;
};

