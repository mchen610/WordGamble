// AppRoutes.tsx

import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import PlayPage from "./components/PlayPage";
import { Test } from "./components/Test";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    );
};

export default AppRoutes;
