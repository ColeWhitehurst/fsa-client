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

  const departmentsToDisplay = departments.filter((department) =>
    department.name.toLowerCase().includes(searchParam)
  );

  async function handleDetails(departmentId) {
    const APIResponse = await getSingleDepartment(departmentId);
    navigate(`/departments/${departmentId}`);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const APIResponse = await addDepartment(
      name,
      email,
      localStorage.getItem("token")
    );
    setDepartments(APIResponse);
  }

  async function handleChange(name, email, description, image, departmentId) {
    const APIResponse = await updateDepartment(
      name,
      email,
      description,
      image,
      departmentId,
      localStorage.getItem("token")
    );
    setShowUpdate(false);
    setRefresh(!refresh);
  }

  return (
    <div className="container my-5 text-light">
      <div className="mb-4">
        <input
          type="text"
          className="form-control bg-dark text-light border-secondary"
          placeholder="Search departments..."
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
        />
      </div>

      {localStorage.getItem("token") && (
        <form
          onSubmit={handleAdd}
          className="p-4 rounded mb-5">
          <h4 className="mb-3 text-light">Add New Department</h4>
          <div className="mb-3">
            <input
              className="form-control bg-dark text-light"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              required/>
          </div>
          <div className="mb-3">
            <input
              className="form-control bg-dark text-light"
              value={description}
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
              required/>
          </div>
          <div className="mb-3">
            <input
              className="form-control bg-dark text-light"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control bg-dark text-light"
              value={image}
              placeholder="Enter Image Link"
              onChange={(e) => setImage(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-outline-light">
            Add Department
          </button>
        </form>
      )}

      <div className="row">
        {departmentsToDisplay.map((department) => (
          <div key={department.id} className="col-md-4 mb-4">
            <div className="card bg-dark text-light shadow h-100">
              <div className="card-body text-center">
                <h5 className="card-title">{department.name}</h5>
                <p className="card-text">{department.description}</p>
                <p className="card-text">{department.email}</p>
                <img
                  src={department.image}
                  alt={department.name}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "200px", objectFit: "cover" }}/>
                <button
                  className="btn bg-danger"
                  onClick={() => handleDetails(department.id)}>
                  More Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;