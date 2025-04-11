import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleDepartment,
  getDepartmentProfessors,
  removeDepartmentProfessor,
  removeDepartment,
} from "../API/departments";

const SingleSubject = ({ token }) => {
  const [department, setDepartment] = useState(null);
  const [professors, setProfessors] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getSubject() {
      const response = await getSingleDepartment(id);
      return response;
    }
    async function getProfessorsByDepartment() {
      const response = await getDepartmentProfessors(id);
      return response;
    }

    async function getDepartmentInfo() {
      const responseDpmt = await getSubject(id);
      const responseProf = await getProfessorsByDepartment(id);
      setDepartment(responseDpmt);
      setProfessors(responseProf);
    }

    getDepartmentInfo();
  }, []);

  const handleRemove = async (professorId) => {
    try {
      const response = await removeDepartmentProfessor(
        professorId,
        localStorage.getItem("token")
      );
      setProfessors(response);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await removeDepartment(
        id,
        localStorage.getItem("token")
      );
      setDepartment(response);
      navigate("/departments");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container my-5 text-light">
      {department && (
        <div className="card bg-dark text-light mb-4 shadow-lg">
          <div className="card-body text-center">
            <h3 className="card-title">{department.name}</h3>
            <p className="card-text">
              <strong>Description:</strong> {department.description}
            </p>
            <img
              src={department.image}
              alt={department.title}
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "250px", objectFit: "cover" }}/>
            {localStorage.getItem("token") && (
              <button
                onClick={() =>
                  handleDelete(department.id, localStorage.getItem("token"))}
                className="btn btn-outline-danger">
                Remove Department
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mb-3">
        <button className="btn btn-secondary" onClick={() => navigate("/departments")}>
          Back to Department List
        </button>
      </div>

      <div className="row">
        {professors &&
          professors.map((prof) => (
            <div key={prof.id} className="col-md-4 mb-4">
              <div className="card bg-dark text-light h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{prof.name}</h5>
                  <p className="card-text">{prof.email}</p>
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "200px", objectFit: "cover" }}/>
                  {localStorage.getItem("token") && (
                    <button
                      onClick={() => handleRemove(prof.id)}
                      className="btn btn-outline-danger">
                      Remove from Department
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SingleSubject;