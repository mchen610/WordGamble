import "./Footer.css";
import { Link } from "react-router-dom";

interface IFooterItem {
    title: string;
    path: string;
}

interface IFooter {
    mode: "light" | "dark";
}

function Footer({ mode }: IFooter) {
    const footerLinks: IFooterItem[] = [
        {
            title: "About",
            path: "/about",
        },
        {
            title: "Privacy Policy",
            path: "/privacy-policy",
        },
        {
            title: "Contact",
            path: "/contact",
        },
    ];

    const classNames = {
        light: "bg-white navbar-light border-dark",
        dark: "bg-dark navbar-dark border-white",
    };

    return (
        <nav className={`navbar navbar-expand-lg py-0 fixed-bottom border-bottom ${classNames[mode]}`}>
            <div
                className="container-fluid collapse navbar-collapse"
            >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                    {footerLinks.map((item) => (
                        <Link className="nav-link px-3" to={item.path} key={item.title}>
                            <li>{item.title}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Footer;
