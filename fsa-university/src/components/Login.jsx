import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username && !password) {
      setError("This field is required.");
      console.error(error);
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      setToken(result);
      localStorage.setItem("token", result);
      setSuccessMessage(`${result.message} Welcome ${result.username}`);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card p-4 rounded">
        <h2 className="text-center text-light mb-4">Sign In</h2>
        {error && <p className="text-danger">{error}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">
              Username
            </label>
            <input
              id="username"
              value={username}
              placeholder="Enter Your username"
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
