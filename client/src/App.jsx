import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home/Home";
import Places from "./views/Places/Places";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/places" element={<Places />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;