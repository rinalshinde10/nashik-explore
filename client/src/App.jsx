import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./views/Home/Home";
import Places from "./views/Places/Places";
import PlaceDetails from "./views/PlaceDetails/PlaceDetails";

import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

import Profile from "./views/Profile/Profile";

import Admin from "./views/Admin/Admin";


function App() {

    return (

        <BrowserRouter>

            {/* ============================= */}
            {/* COMMON NAVBAR */}
            {/* ============================= */}

            <Navbar />


            <Routes>


                {/* ============================= */}
                {/* HOME */}
                {/* ============================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* ============================= */}
                {/* AUTHENTICATION */}
                {/* ============================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ============================= */}
                {/* PLACES */}
                {/* ============================= */}

                <Route
                    path="/places"
                    element={<Places />}
                />


                {/* ============================= */}
                {/* PLACE DETAILS */}
                {/* ============================= */}

                <Route
                    path="/places/:id"
                    element={<PlaceDetails />}
                />


                {/* ============================= */}
                {/* USER PROFILE */}
                {/* ============================= */}

                <Route
                    path="/profile"
                    element={<Profile />}
                />
<Route
    path="/admin"
    element={<Admin />}
/>

            </Routes>

        </BrowserRouter>

    );

}


export default App;