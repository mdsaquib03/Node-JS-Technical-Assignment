import { Link } from "react-router-dom";
import "../styles/notFound.css";

function NotFound() {
    return (
        <div className="notFoundBody">
            <div className="notFoundContainer">
                <h1 className="notFoundHeading">404</h1>
                <h2 className="notFoundSubHeading">Oops! Page Not Found</h2>
                <p className="notFoundParagraph">
                    The page you are looking for might have been removed, had its name
                    changed, or is temporarily unavailable.
                </p>
                <Link to="/">Go back home</Link>
            </div>
        </div>
    );
}

export default NotFound;