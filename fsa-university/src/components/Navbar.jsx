
import { Link } from "react-router-dom";
import fsaLogo from '../assets/fsa-logo.png';


const Navbar = ({ setToken }) => {

  return (
    <nav className="navbar">
      <div className="nav-left">
        {!localStorage.getItem("token") ? (
          <div className="guest">
            <Link to="/">Home</Link>
            <Link to="/professors">Professors</Link>
            <Link to="/departments">Departments</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div className="user">
            <Link to="/">Home</Link>
            <Link to="/professors">Professors</Link>
            <Link to="/departments">Departments</Link>
            <Link to="/departments/1">English</Link>
            <Link to="/departments/2">History</Link>
            <Link to="/departments/3">Latin</Link>
            <Link to="/departments/4">Math</Link>
            <Link to="/departments/5">Science</Link>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
      <div>
      <img src={fsaLogo} alt="Fullstack Academy Logo" className="logo" />
      </div>
    </nav>
  );
};

export default Navbar;