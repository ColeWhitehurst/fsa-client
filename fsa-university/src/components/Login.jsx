import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password) {
      setError("This field is required.");
      console.error(error);
    }
    try {
      const response = await fetch(
        "https://localhost:3000/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const result = await response.json();
      setToken(result.token);
      setSuccessMessage(`${result.message} Welcome ${result.email}`);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="login">
        <label>
          Email:{" "}
          <input
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
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
