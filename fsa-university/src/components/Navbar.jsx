import { Link } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  return (
    <>
    <div>
        {!token ? (
       <div className="guest">
        <Link to="/">Home</Link><br />
        <Link to="/faculty">Faculty</Link><br />
        <Link to="/departments">Departments</Link><br />
        <Link to="/login">Login</Link><br />
        <Link to="/register">Register</Link><br />
      </div>
      ) : (
      <div className="user">
        <Link to="/">Home</Link><br />
        <Link to="/faculty">Faculty</Link><br />
        <Link to="/departments">Departments</Link><br />
        <Link to="/departments/english">English</Link><br />
        <Link to="/departments/history">History</Link><br />
        <Link to="/departments/latin">Latin</Link><br />
        <Link to="/departments/math">Math</Link><br />
        <Link to="/departments/science">Science</Link><br />
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
