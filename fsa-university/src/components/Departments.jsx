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
    setName("");
    setDescription("");
    setEmail("");
    setImage("");
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
    <div className="container py-5 text-light">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
        />
      </div>

      {localStorage.getItem("token") && (
        <form
          onSubmit={handleAdd}
          className="bg-dark p-4 rounded shadow mb-5"
        >
          <h4 className="mb-3">Add New Department</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                value={name}
                className="form-control"
                placeholder="Department Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                value={email}
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <input
                value={description}
                className="form-control"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                value={image}
                className="form-control"
                placeholder="Image URL"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-danger w-100">
                Add Department
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="row g-4">
        {departmentsToDisplay.map((department) => (
          <div key={department.id} className="col-md-6 col-lg-4">
            <div className="card bg-dark text-light shadow h-100">
              <img
                src={department.image}
                alt={department.name}
                className="card-img-top object-fit-cover"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{department.name}</h5>
                <p className="card-text">{department.description}</p>
                <p className="card-text"><strong>Email:</strong> {department.email}</p>
                <p className="card-text"><strong>Professors:</strong> {department.professors}</p>
                <button
                  className="btn btn-outline-light w-100 mt-3"
                  onClick={() => handleDetails(department.id)}
                >
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
