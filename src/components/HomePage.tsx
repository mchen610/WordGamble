import "./HomePage.css";
import Footer from "./Footer";
import Link_Button from "./Buttons";

export default function HomePage() {
    return (
        <>
            <title>Word Gamble</title>
            <body className="home">
                <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top py-1">
                    <div className="container d-flex justify-content-center">
                        <a className="navbar-brand">Word Gamble</a>
                    </div>
                </nav>

                <Link_Button
                    className="button rounded breathing"
                    img_link="images/start-button.png"
                    redir_link="/play"
                />

                <Footer />
            </body>
        </>
    );
}
