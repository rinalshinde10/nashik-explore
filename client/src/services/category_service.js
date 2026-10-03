
import axios from "axios";

const API_URL = "https://nashik-explore-api.onrender.com/api/categories";

export const getCategories = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

