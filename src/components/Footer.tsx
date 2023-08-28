import "./Footer.css";
import { Link } from "react-router-dom";

interface footerItem {
    title: string;
    path: string;
}

function Footer() {
    const footerLinks: footerItem[] = [
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

    return (
        <nav className="navbar navbar-expand-lg py-0 bg-white fixed-bottom">
            <div
                className="container-fluid collapse navbar-collapse"
            >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                    {footerLinks.map((item) => (
                        <Link className="nav-link px-3" to={item.path} id={item.title}>
                            <li>{item.title}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Footer;
