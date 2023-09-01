import "./HomePage.css";
import Footer from "./Footer";
import Header from "./Header";
import Link_Button from "./Buttons";

export default function HomePage() {
    return (
        <>
            <title>Word Gamble</title>
            <div className="home">
                <Header mode="dark"/>

                <Link_Button
                    className="button rounded start-button"
                    imgLink="images/start-button.png"
                    redirectLink="/play"
                />

                <Footer mode="light"/>
            </div>
        </>
    );
}
