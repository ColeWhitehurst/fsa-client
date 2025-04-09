import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authorizeAccount } from "../API/authorize";

const Account = ({ token }) => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function authorizeUser() {
      const response = await authorizeAccount(token);
      setAccount(response);
    }
    authorizeUser();
  }, []);

  return (
    <>
      {account && (
        <div key={account.id}>
          <h2>Welcome {account.username}</h2>
          <p>First Name: {account.firstname} </p>
          <p>Last Name: {account.lastname} </p>
        </div>
      )}
      <div>
        <button onClick={() => navigate("/")} className="home">
          Home
        </button>
        <button onClick={() => navigate("/professors")} className="prof">
          Professors
        </button>
        <button onClick={() => navigate("/departments")} className="dpmt">
          Departments
        </button>
      </div>
    </>
  );
};

export default Account;
