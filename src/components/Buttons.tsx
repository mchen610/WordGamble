import "./Buttons.css";
import { Link } from "react-router-dom";

interface Link_Props {
    className: string;
    img_link: string;
    redir_link: string;
}

export default function Link_Button({
    className,
    img_link,
    redir_link,
}: Link_Props) {
    return (
        <div className="centered">
            <Link to={redir_link}>
                <img
                    src={img_link}
                    alt={img_link}
                    className={className}
                />
            </Link>
        </div>
    );
}

interface Props {
    className: string;
    img_link: string;
    func: () => void;
}

export function Button({ className, img_link, func }: Props) {
    return (
        <div className="centered">
            <img
                src={img_link}
                alt={img_link}
                onClick={func}
                className={className}
            />
        </div>
    );
}
