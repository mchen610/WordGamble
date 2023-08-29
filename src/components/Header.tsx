import { Link } from "react-router-dom";

interface IHeader {
    mode: "light" | "dark";
}

export default function Header({ mode }: IHeader) {
    const classNames = {
        light: "bg-white navbar-light border-dark",
        dark: "bg-dark navbar-dark border-white",
    };

    return (
        <nav
            className={`navbar navbar-expand-lg py-1 fixed-top border-bottom border-2 ${classNames[mode]}`}
        >
            <div className="container d-flex justify-content-center">
                <Link className="nav-link px-3 navbar-brand" to="" id="Home">
                    Word Gamble
                </Link>
            </div>
        </nav>
    );
}
