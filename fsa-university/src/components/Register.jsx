import { useState } from "react";

const Register = ({ setToken }) => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, firstName, lastName }),
        }
      );
      const result = await response.json();
      setToken(result.token);
      localStorage.setItem("token", result.token);
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center">
      <div className="register-card p-4 rounded">
        <h2 className="text-center text-light mb-4">Sign Up</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label text-light">
              First Name
            </label>
            <input
              id="firstName"
              value={firstName}
              placeholder="Enter Your First Name"
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label text-light">
              Last Name
            </label>
            <input
              id="lastName"
              value={lastName}
              placeholder="Enter Your Last Name"
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">
              Username
            </label>
            <input
              id="username"
              value={username}
              placeholder="Enter Your Username"
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
          <button type="submit" className="btn btn-danger w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;