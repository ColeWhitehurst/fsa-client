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
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="login">
        <label>
          Username:{" "}
          <input
            value={username}
            placeholder="Enter Your username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="8"
            required
          />
          <br />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
