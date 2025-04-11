import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {useAuth} from "../context/AuthContext";
import {
  addDepartment,
  updateDepartment,
} from "../API/departments";
import { addProfessor, updateProfessor } from "../API/professors";

const Change = () => {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [professors, setProfessors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const navigate = useNavigate();

  async function handleProfessorAdd(e) {
    e.preventDefault();
    const APIResponse = await addProfessor(
      name,
      email,
      department,
      image,
      localStorage.getItem("token")
    );
    setProfessors(APIResponse);
    navigate("/professors");
  }

  async function handleProfessorChange(name, email, bio, image, department) {
    const APIResponse = await updateProfessor(
      name,
      email,
      bio,
      image,
      department,
      localStorage.getItem("token")
    );
    setShowUpdate(false);
    navigate("/professors");
  }

  async function handleDepartmentAdd(e) {
    e.preventDefault();
    const APIResponse = await addDepartment(name, email, localStorage.getItem("token"));
    setDepartments(APIResponse);
    navigate("/departments");
  };

  async function handleDepartmentChange(name, email, description, image, departmentId) {
    const APIResponse = await updateDepartment(name, email, description, image, departmentId, localStorage.getItem("token"));
    setShowUpdate(false);
    navigate("/departments");
  };
  

  return (
    <>
      {localStorage.getItem("token") && (
        <div>
          {/* Add Professor Form */}
          <form onSubmit={handleProfessorAdd} className="addProf">
            <label>
              Name:
              <input
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
            </label>
            <label>
              Department:
              <input
                value={department}
                placeholder="Enter Department"
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
              <br />
            </label>
            <label>
              Email:
              <input
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
            </label>
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              value={image}
              placeholder="Enter Image Link"
              onChange={(e) => setImage(e.target.value)}
            />
            <br />
            <button type="submit">Add Professor</button>
          </form>

          {/* Add Department Form */}
          <form onSubmit={handleDepartmentAdd} className="addDpmt">
            <label>
              Name:
              <input
                value={name}
                placeholder="Enter Department Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
            </label>
            <label>
              Description:
              <input
                value={description}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <br />
            </label>
            <label>
              Email:
              <input
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
            </label>
            <label htmlFor="image">Image Link:</label>
            <input
              type="text"
              id="image"
              value={image}
              placeholder="Enter Image Link"
              onChange={(e) => setImage(e.target.value)}
            />
            <br />
            <button type="submit">Add Department</button>
          </form>

          {/* Update Department Form */}
          <br />
          <button onClick={() => setShowUpdate(!showUpdate)}>
            Update Department Form
          </button>

          {showUpdate && (
            <div>
              <form>
                <label>
                  Name:
                  <input
                    value={name}
                    placeholder="Enter Department Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <br />
                </label>
                <label>
                  Description:
                  <input
                    value={description}
                    placeholder="Enter Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <br />
                </label>
                <label>
                  Email:
                  <input
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <br />
                </label>
                <label htmlFor="image">Image Link:</label>
                <input
                  type="text"
                  id="image"
                  value={image}
                  placeholder="Enter Image Link"
                  onChange={(e) => setImage(e.target.value)}
                />
                <br />
                <button
                  onClick={() =>
                    handleDepartmentChange(name, email, description, image, department)
                  }
                >
                  Update Department
                </button>
              </form>
              <button onClick={() => setShowUpdate(!showUpdate)} >
                Update Professor Form
              </button>
              {showUpdate && (
                <div>
                <label>
                {" "}
                Name:
                <input
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <br />
              </label>
              <label>
                {" "}
                Department:
                <input
                  value={department}
                  placeholder="Enter Department"
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
                <br />
              </label>
              <label>
                {" "}
                Email:
                <input
                  value={email}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <br />
              </label>
              <label htmlFor="image"> Image:</label>
              <input
                type="text"
                id="image"
                value={image}
                placeholder="Enter Image Link"
                onChange={(e) => setImage(e.target.value)}
              ></input><br />
              <button onClick={() => handleProfessorChange(name, email, bio, image, department, professors.id)} >
                Update Professor
              </button>
              </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};


export default Change;
