import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import PlayPage from "./components/PlayPage";
import Footer from "./components/Footer";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HomePage />
    </React.StrictMode>
);
