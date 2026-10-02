import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";
import Places from "./views/Places/Places";
import PlaceDetails from "./views/PlaceDetails/PlaceDetails";
import About from "./views/About/About";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Profile from "./views/Profile/Profile";
                                                                                                                                                


function App() {

    return (

        <BrowserRouter>

            {/* ============================= */}
            {/* COMMON NAVBAR */}
            {/* ============================= */}

            <Navbar />


            {/* ============================= */}
            {/* ALL PAGES */}
            {/* ============================= */}

            <Routes>


                {/* ============================= */}
                {/* HOME */}
                {/* ============================= */}

                <Route
                    path="/"
                    element={<Home />}
                />
<Route
    path="/about"
    element={<About />}
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


                


            </Routes>


            {/* ============================= */}
            {/* COMMON FOOTER */}
            {/* ============================= */}

            <Footer />


        </BrowserRouter>

    );

}
export default App;

