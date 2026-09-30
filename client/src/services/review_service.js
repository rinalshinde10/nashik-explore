import axios from "axios";

const API_URL = "http://localhost:8080/api/reviews";

// Add or Update Rating
export const addRating = async (place, rating) => {
const response = await axios.post(
API_URL,
{
place,
rating
},
{
headers: {
Authorization: `Bearer ${localStorage.getItem("token")}`
}
}
);

```
return response.data;
```

};

// Get Reviews for a Place
export const getPlaceReviews = async (placeId) => {
const response = await axios.get(
`${API_URL}/place/${placeId}`
);


return response.data;


};
