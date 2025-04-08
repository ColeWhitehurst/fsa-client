import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import Navbar from "./components/Navbar";
import Account from "./components/Account";
import Professors from "./components/Professors";
import Departments from "./components/Departments";
import English from "./components/Subjects/English";
import History from "./components/Subjects/History";
import Latin from "./components/Subjects/Latin";
import Math from "./components/Subjects/Math";
import Science from "./components/Subjects/Science";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <div className="nav">
        <div>
          <Navbar />
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account token={token} />} />
          <Route path="/professors" element={<Professors />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/english" element={<English />} />
          <Route path="/departments/history" element={<History />} />
          <Route path="/departments/latin" element={<Latin />} />
          <Route path="/departments/math" element={<Math />} />
          <Route path="/departments/science" element={<Science />} />
        </Routes>
        <div className='forms'>
          <Routes>
            <Route
              path="/login"
              element={<Login token={token} setToken={setToken} />}
            />
            <Route
              path="/register"
              element={<Register token={token} setToken={setToken} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
