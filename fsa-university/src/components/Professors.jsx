import { useState, useEffect } from "react";
import {
  addProfessor,
  getProfessors,
} from "../API/professors";
import { getDepartments } from "../API/departments";
import { useAuth } from "../context/AuthContext";

const Professors = () => {
  const { refresh, setRefresh } = useAuth();
  const [professors, setProfessors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    async function renderProfessors() {
      const professors = await getProfessors();
      setProfessors(professors);
    }
    renderProfessors();
  }, [refresh]);
  
  useEffect(() => {
    async function fetchDepartments() {
      const deptData = await getDepartments();
      setDepartments(deptData);
    }
    fetchDepartments();
  }, []);

  const professorsToDisplay = searchParam
    ? professors.filter((professor) =>
        professor.name.toLowerCase().includes(searchParam)
      )
    : professors;

  async function handleAdd(e) {
    e.preventDefault();
    try {
    const APIResponse = await addProfessor(
      name,
      email,
      image,
      bio,
      Number(departmentId),
      localStorage.getItem("token")
    );
    setProfessors((prev) => [...prev, APIResponse]);
    setRefresh(!refresh);
  } catch (err) {
    console.error("handleAdd error:", err);
  }
  };

  return (
    <div className="professor-container py-5">
      <div className="container">
        <div className="mb-4">
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Search professors"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </div>

        {localStorage.getItem("token") && (
          <form onSubmit={handleAdd} className="p-4 rounded mb-4">
            <h4 className="text-light mb-3">Add New Professor</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  className="form-control"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  {Array.isArray(departments) && departments.length > 0 ? (
                    departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading departments...</option>
                  )}
                </select>
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  value={image}
                  placeholder="Image URL"
                  onChange={(e) => setImage(e.target.value) || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rushu.rush.edu%2Ffaculty%2Fchristine-borgstrom-dnp-aprn-fnp-bc-pnp-c&psig=AOvVaw2qxsPmSUiCnm76gcuk6P74&ust=1744651935680000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNjStIrF1YwDFQAAAAAdAAAAABAE'}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-danger w-100">
                  Add Professor
                </button>
              </div>
            </div>
          </form>
        )}
        <div className="row">
          {professorsToDisplay.map((prof) => (
            <div key={prof.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card bg-dark text-light h-100 shadow professor-card">
                <img
                  src={prof.image}
                  alt={prof.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{prof.name}</h5>
                  <p className="card-text">
                    {prof.department ? prof.department.name : "No department"}
                  </p>
                  <p className="card-text">{prof.email}</p>
                  <p className="card-text">{prof.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Professors;
