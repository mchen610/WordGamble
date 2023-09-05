import "./HomePage.css";
import Footer from "./Footer";
import Header from "./Header";
import Link_Button from "./Buttons";
import { useEffect } from "react";

export default function HomePage() {
     useEffect(() => {
         // Create an array of image URLs to preload
         const imageUrls = [
             "images/start-bg.png",
             "images/play-bg.png"
         ];

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
        <>
            <title>Word Gamble</title>
            
            <div className="home">
                <Header mode="dark"/>

                <Link_Button
                    className="rounded start-button"
                    imgLink="images/start-button.png"
                    redirectLink="/play"
                />

                <Footer mode="light"/>
            </div>
        </>
    );
}
