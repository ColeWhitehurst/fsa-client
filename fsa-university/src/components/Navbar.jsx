
import { Link } from "react-router-dom";
import fsaLogo from '../assets/fsa-logo.png';


const Navbar = ({ token, setToken }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        {!token ? (
          <div className="guest">
            <Link to="/">Home</Link>
            <Link to="/faculty">Faculty</Link>
            <Link to="/departments">Departments</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div className="user">
            <Link to="/">Home</Link>
            <Link to="/faculty">Faculty</Link>
            <Link to="/departments">Departments</Link>
            <Link to="/departments/english">English</Link>
            <Link to="/departments/history">History</Link>
            <Link to="/departments/latin">Latin</Link>
            <Link to="/departments/math">Math</Link>
            <Link to="/departments/science">Science</Link>
            <Link
              to="/"
              onClick={() => {
                setToken(null);
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