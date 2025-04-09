import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addDepartment, getDepartments, getSingleDepartment } from "../API/departments";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function renderDepartments() {
      const departments = await getDepartments();
      setDepartments(departments);
    }
    renderDepartments();
  }, []);

  const departmentsToDisplay = searchParam
    ? departments.filter((department) =>
        department.name.toLowerCase().includes(searchParam)
      )
    : departments;

  async function handleDetails(departmentId) {
    const APIResponse = await getSingleDepartment(departmentId);
    navigate(`/departments/${departmentId}`);
  };

  async function handleAdd(e) {
    e.preventDefault();
    const APIResponse = await addDepartment(localStorage.getItem("token"));
    setDepartments(APIResponse);
  }

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
      <div className="allDepts">
        {departmentsToDisplay.map((department) => {
          return (
            <div key={department.id} className="book">
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
              {localStorage.getItem("token") && (
                <form onSubmit={handleAdd} className="addDpmt">

                </form>
              )}
            </div>
          );
        })}
        ;
      </div>
    </>
  );
};

export default Departments;
