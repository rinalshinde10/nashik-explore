
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home/Home";
import Places from "./views/Places/Places";
import PlaceDetails from "./views/PlaceDetails/PlaceDetails";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Home */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* Login */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Register */}

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Places */}

                <Route
                    path="/places"
                    element={<Places />}
                />


                {/* Place Details */}

                <Route
                    path="/places/:id"
                    element={<PlaceDetails />}
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;

