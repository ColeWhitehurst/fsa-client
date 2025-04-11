import { Link } from "react-router-dom";
import fsaLogo from '../assets/fsa-logo.png';
import { useParams } from "react-router-dom";

const Navbar = () => {
  const { id } = useParams();
  

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex">
          {!localStorage.getItem("token") ? (
            <>
              <Link to="/" className="nav-link text-white">Home</Link>
              <Link to="/professors" className="nav-link text-white">Professors</Link>
              <Link to="/departments" className="nav-link text-white">Departments</Link>
              <Link to="/login" className="nav-link text-white">Login</Link>
              <Link to="/register" className="nav-link text-white">Register</Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link text-white">Home</Link>
              <Link to="/professors" className="nav-link text-white">Professors</Link>
              <Link to="/departments" className="nav-link text-white">Departments</Link>
              <Link to="/updates" className="nav-link text-white">Update</Link>
              <Link 
                to="/"
                className="nav-link text-white"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </Link>
            </>
          )}
        </div>
        
        <div className="d-flex justify-content-end">
          <img src={fsaLogo} alt="Fullstack Academy Logo" style={{ width: '100px', height: 'auto' }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
