
import axios from "axios";

const API_URL = "http://localhost:8080/api/places";

export const getPlaces = async (params = {}) => {
    const response = await axios.get(API_URL, {
        params: params
    });

    return response.data;
};

