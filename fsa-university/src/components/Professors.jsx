import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { addProfessor, getProfessors, getSingleProfessor, updateProfessor } from "../API/professors";
import {useAuth} from "../context/AuthContext";

const Professors = () => {
  const { refresh, setRefresh } = useAuth();
  const [professors, setProfessors] = useState([]);
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function renderProfessors() {
      const professors = await getProfessors();
      setProfessors(professors);
    }
    renderProfessors();
  }, [refresh]);

  const professorsToDisplay = searchParam
    ? professors.filter((professor) =>
        professor.name.toLowerCase().includes(searchParam)
      )
    : professors;

  async function handleAdd(e) {
    e.preventDefault();
    const APIResponse = await addProfessor(
      name,
      email,
      department, 
      image,
      localStorage.getItem("token")
    );
    setProfessors(APIResponse);
  }

  async function handleChange(name, email, bio, image, department) {
    const APIResponse = await updateProfessor(
      name,
      email,
      bio,
      image,
      department,
      localStorage.getItem("token")
    );
    setShowUpdate(false);
    setRefresh(!refresh);
  }

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
                <input
                  className="form-control"
                  value={department}
                  placeholder="Department"
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
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
                  onChange={(e) => setImage(e.target.value)}
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
                  <p className="card-text">{prof.department.name}</p>
                  <p className="card-text">{prof.email}</p>
                  <p className="card-text">{prof.bio}</p>
                  <button
                    onClick={() => setShowUpdate(!showUpdate)}
                    className="btn btn-outline-light mt-2"
                  >
                    Update
                  </button>
                  {showUpdate && (
                    <div className="mt-3">
                      <input
                        className="form-control mb-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Update Name"
                      />
                      <input
                        className="form-control mb-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Update Email"
                      />
                      <input
                        className="form-control mb-2"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="Update Department"
                      />
                      <input
                        className="form-control mb-2"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Update Image"
                      />
                      <button
                        className="btn btn-danger w-100"
                        onClick={() =>
                          handleChange(name, email, bio, image, department, prof.id)
                        }
                      >
                        Confirm Update
                      </button>
                    </div>
                  )}
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
