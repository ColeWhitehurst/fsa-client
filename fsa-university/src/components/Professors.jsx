import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addProfessor, getProfessors, getSingleProfessor, updateProfessor } from "../API/professors";

const Professors = () => {
  const [professors, setProfessors] = useState([]);
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function renderProfessors() {
      const professors = await getProfessors();
      setProfessors(professors);
    }
    renderProfessors();
  }, []);

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
      {localStorage.getItem("token") && (
        <form onSubmit={handleAdd} className="addProf">
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
              placeholder="Enter Name"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
          </label>
          <label htmlFor="image">{" "}Image:</label>
          <input
            type="text"
            id="image"
            value={image}
            placeholder="Enter Image Link"
            onChange={(e) => setImage(e.target.value)}
          ></input>
          <br />
          <button type="submit">Add Professor</button>{" "}
        </form>
      )}
      <div className="allDepts">
        {professorsToDisplay.map((professor) => {
          return (
            <div key={professor.id} className="professor">
              <h4>{professor.name}</h4>
              <h5>{professor.department}</h5>
              <h5>{professor.bio}</h5>
              <h5>{professor.email}</h5>
              <img
                src={professor.image}
                alt={professor.name}
                className="profPics"
              />
              <br />
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
              ></input>
              <button onClick={() => handleChange(name, email, bio, image, department, professor.id)} >
                Update Professor
              </button>
              </div>
              )}
              <br />
              <br />
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Professors;
