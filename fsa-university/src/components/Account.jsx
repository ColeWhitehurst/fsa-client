import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Account = ({ token }) => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  return (
    <>
      {account && (
        <div key={account.id}>
          <h2>Welcome {account.email}</h2>
          <p>First Name: {account.firstname} </p>
          <p>Last Name: {account.lastname} </p>
          {!token ? (
            <div>
              <h4>You Currently Have No Books Reserved</h4>
            </div>
          ) : (
            <div>
              <h4>Books Currently Reserved</h4>
              {account.reservations.map((idx) => (
                <div className="reservedBook">
                  <p>{idx.title}</p>
                  <p>{idx.author}</p>
                  <img
                    src={idx.coverimage}
                    alt={idx.title}
                    className="reservations"
                  />
                  <br />
                  <button
                    onClick={() => handleClick(idx.id, token)}
                    className="return"
                  >
                    Return Book
                  </button>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => navigate("/")} className="back">
            Booklist
          </button>
        </div>
      )}
    </>
  );
};

export default Account;
