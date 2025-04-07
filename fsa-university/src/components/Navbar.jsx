import { Link } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  return (
    <>
    <div>
        {!token ? (
       <div className="guest">
        <Link to="/">Home</Link>
        <Link to="/faculty">Faculty</Link>
        <Link to="/departments">All Departments</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      ) : (
      <div className="user">
        <Link to="/">Home</Link>
        <Link to="/faculty">Faculty</Link>
        <Link to="/departments">All Departments</Link>
        <Link to="/departments/english">English</Link>
        <Link to="/departments/history">History</Link>
        <Link to="/departments/latin">Latin</Link>
        <Link to="/departments/math">Math</Link>
        <Link to="/departments/science">Science</Link>
        <Link
          onClick={() => {
            setToken(null);
            window.location.reload();
          }}
          to="/"
        >
          Logout
        </Link>
      </div>
      )}
    </div>      
    </>
  );
};

export default Navbar;
