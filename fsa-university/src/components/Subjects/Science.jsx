import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getSingleDepartment,
    getDepartmentProfessors,
    removeDepartmentProfessor,
  } from "../../API/departments";

const Science = () => {
  const [department, setDepartment] = useState(null);
  const [professors, setProfessors] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getScience() {
      const response = await getSingleDepartment(id);
      return response;
    }
    async function getProfessorsByDepartment() {
      const response = await getDepartmentProfessors(id);
      return response;
    }

    async function getDepartmentInfo() {
      const responseDpmt = await getScience(id);
      const responseProf = await getProfessorsByDepartment(id);
      setDepartment(responseDpmt);
      setProfessors(responseProf);
    }

    getDepartmentInfo();
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
            {token && (
              <div>
                <button
                  onClick={() => handleDelete(department.id, token)}
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
                  onClick={() => handleRemove(idx.id, token)}
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

export default Science;