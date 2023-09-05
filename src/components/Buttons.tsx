import "./Buttons.css";
import { Link } from "react-router-dom";

interface ICommonProps {
    className: string;
    imgLink: string;
}

interface ILinkButtonProps extends ICommonProps {
    redirectLink: string;
}

interface IButtonProps extends ICommonProps {
    onClickHandler: () => void;
}

export default function Link_Button({
    className,
    imgLink,
    redirectLink,
}: ILinkButtonProps) {
    return (
        <div className="centered link-button-container">
            <Link to={redirectLink} className={className}>
                <img src={imgLink} alt={imgLink} className="rounded button" />
            </Link>
        </div>
    );
}

export function Button({ className, imgLink, onClickHandler }: IButtonProps) {
    return (
        <div className="centered button-container">
            <img
                src={imgLink}
                alt={imgLink}
                onClick={onClickHandler}
                className={`${className} button gradient-overlay`}
            />
        </div>
    );
}
