import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const History = () => {
  const [department, setDepartment] = useState(null);
  const [professors, setProfessors] = useState(null);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

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

export default History;
