import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  addDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
} from "../API/departments";

const Departments = () => {
  const { refresh, setRefresh } = useContext(AuthContext);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function renderDepartments() {
      const departments = await getDepartments();
      setDepartments(departments);
    }
    renderDepartments();
  }, [refresh]);
  console.log(departments);
  

  const departmentsToDisplay = 
    departments.filter((department) =>
        department.name.toLowerCase().includes(searchParam));

  async function handleDetails(departmentId) {
    const APIResponse = await getSingleDepartment(departmentId);
    navigate(`/departments/${departmentId}`);
  };

  async function handleAdd(e) {
    e.preventDefault();
    const APIResponse = await addDepartment(name, email, localStorage.getItem("token"));
    setDepartments(APIResponse);
  };

  async function handleChange(name, email, description, image, departmentId) {
    const APIResponse = await updateDepartment(name, email, description, image, departmentId, localStorage.getItem("token"));
    setShowUpdate(false);
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="search">
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>
      {localStorage.getItem("token") && (
        <form onSubmit={handleAdd} className="addDpmt">
          <label>
            {" "}
            Name:
            <input
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
          </label>
          <label>
            {" "}
            Description:
            <input
              value={description}
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br />
          </label>
          <label>
            {" "}
            Email:
            <input
              value={email}
              placeholder="Enter Name"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
          </label>
          <label htmlFor="image"> Image Link:</label>
          <input
            type="text"
            id="image"
            value={image}
            placeholder="Enter Image Link"
            onChange={(e) => setImage(e.target.value)}
          ></input>
          <br />
          <button type="submit">Add Department</button>{" "}
        </form>
      )}
      <div className="allDepts">
        {departmentsToDisplay.map((department) => {
          return (
            <div key={department.id} className="department">
              <h4>{department.name}</h4>
              <h5>{department.description}</h5>
              <h5>{department.professors}</h5>
              <h5>{department.email}</h5>
              <img
                src={department.image}
                alt={department.name}
                className="dpmtPics"
              />
              <br />
              <br />
              <button
                className="details"
                onClick={() => handleDetails(department.id)}
              >
                More Details
              </button>
              <br />
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Departments;
