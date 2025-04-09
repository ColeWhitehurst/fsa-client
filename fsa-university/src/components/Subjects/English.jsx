import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleDepartment, getDepartmentProfessors } from "../../API/departments";

const English = ({ token }) => {
  const [department, setDepartment] = useState(null);
  const [professors, setProfessors] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getEnglish() {
      const response = await getSingleDepartment(id);
      setDepartment(response);
    }
    async function getProfessorsByDepartment() {
      const response = await getDepartmentProfessors(id);
      setProfessors(response);
    }

    getEnglish();
    getProfessorsByDepartment();
  }, []);

  const handleRemove = async (professorId) => {
    try {
      const response = await removeDepartmentProfessor(professorId, token);
      setProfessors(response);
    } catch (err) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await removeDepartment(id);
      setDepartment(response);
      navigate("/departments");
    } catch (err) {
      setError(error.message);
    }
  };

  return (
    <>
      {department && (
        <div key={department.id} className="singledepartment">
          <p>
            <b>Department:</b> {department.name}
          </p>
          <p>
            <b>Author:</b> {department.professors}
          </p>
          <p>
            <b>Description:</b> {department.description}
          </p>
          <img src={department.image} alt={department.title} className="singular" />
          <br />
          {token && (
            <div>
            <button onClick={() => handleDelete(department.id)} className="removeDpmt">
              Remove Department
            </button>
            <button onClick={() => handleRemove(professors.id)} className="removeDpmt">
            Remove Department
            </button>
            </div>
          )}
        </div>
      )}
      <button className="back" onClick={() => navigate("/departments")}>
        Department List
      </button>
      <br />
    </>
  );
};

export default English;
