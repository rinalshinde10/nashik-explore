
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./views/Home/Home";
import Places from "./views/Places/Places";
import PlaceDetails from "./views/PlaceDetails/PlaceDetails";
import About from "./views/About/About";
import Login from "./views/Login/Login";



// =====================================
// PROTECTED ROUTE
// =====================================

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}


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


                {/* ============================= */}
                {/* ABOUT */}
                {/* ============================= */}

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


                {/* ============================= */}
                {/* PLACES - LOGIN REQUIRED */}
                {/* ============================= */}

                <Route
                    path="/places"
                    element={
                        <ProtectedRoute>
                            <Places />
                        </ProtectedRoute>
                    }
                />


                {/* ============================= */}
                {/* PLACE DETAILS - LOGIN REQUIRED */}
                {/* ============================= */}

                <Route
                    path="/places/:id"
                    element={
                        <ProtectedRoute>
                            <PlaceDetails />
                        </ProtectedRoute>
                    }
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

