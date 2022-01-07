import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar () {
    return (
    <div className="navGroup">
        <Link to='/' className="link">
            <h2 className="headers">-IFY</h2>
        </Link>
        <h2 className="headers">ABOUT</h2>
    </div>
    )
}