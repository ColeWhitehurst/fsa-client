import { useState } from "react";

const Register = ({ setToken }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://localhost:3000/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, firstName, lastName }),
        }
      );
      const result = await response.json();
      setToken(result.token);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error.message}</p>}
      <form onSubmit={handleSubmit} className="register">
        <label>
          First Name:{" "}
          <input
            value={firstName}
            placeholder="Enter Your First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
        </label>
        <br />
        <label>
          Last Name:{" "}
          <input
            value={lastName}
            placeholder="Enter Your Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
        </label>
        <br />
        <label>
          Email:{" "}
          <input
            value={email}
            placeholder="Enter Your Username"
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

export default Register;