import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleDepartment,
  getDepartmentProfessors,
  removeDepartmentProfessor,
  removeDepartment
} from "../../API/departments";

const English = ({ token }) => {
  const [department, setDepartment] = useState(null);
  const [professors, setProfessors] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getEnglish() {
      const response = await getSingleDepartment(id);
      return response;
    }
    async function getProfessorsByDepartment() {
      const response = await getDepartmentProfessors(id);
      return response;
    }

    async function getDepartmentInfo() {
      const responseDpmt = await getEnglish(id);
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
    <>
      <div>
        {department && (
          <div key={department.id} className="singleDepartment">
            <p>
              <b>Department:</b> {department.name}
            </p>
            <p>
              <b>Author:</b> {department.professors}
            </p>
            <p>
              <b>Description:</b> {department.description}
            </p>
            <img
              src={department.image}
              alt={department.title}
              className="singular"
            />
            <br />
            {localStorage.getItem("token") && (
              <div>
                <button
                  onClick={() =>
                    handleDelete(department.id, localStorage.getItem("token"))
                  }
                  className="removeDpmt"
                >
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
        {professors &&
          professors.map((idx) => {
            return (
              <div key={idx.id} className="prof">
                <h4>{idx.name}</h4>
                <h5>{idx.email}</h5>
                <img src={idx.image} alt={idx.name} className="profPics" />
                <br />
                <button
                  onClick={() =>
                    handleRemove(idx.id, localStorage.getItem("token"))
                  }
                  className="removeProf"
                >
                  Remove Professor from Department
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default English;
