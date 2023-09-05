// AppRoutes.tsx

import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import PlayPage from "./components/PlayPage";
import { Test } from "./components/Test";
import { useEffect } from "react";

const AppRoutes = () => {
    useEffect(() => {
        // Create an array of image URLs to preload
        const imageUrls = ["images/start-bg.png", "images/play-bg.png"];

        // Create an array of Image objects and load them
        const images = imageUrls.map((url) => {
            const img = new Image();
            img.src = url;
            return img;
        });

        // You can listen for the 'load' event if you need to perform
        // some action once all images are preloaded.
        Promise.all(images.map((img) => img.decode()))
            .then(() => {
                console.log("All images preloaded.");
                // You can do something here once all images are preloaded.
            })
            .catch((error) => {
                console.error("Error preloading images:", error);
            });
    }, []);

    return (
        <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    );
};

export default AppRoutes;
