import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfessors, getSingleProfessor } from "../API/professors";

const Professors = () => {
    const [professors, setProfessors] = useState([]);
    const [searchParam, setSearchParam] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function renderProfessors() {
            const professors = await getProfessors();
            setProfessors(professors);
        }
        renderProfessors();
    }, []);

    const professorsToDisplay = searchParam ? professors.filter((professor) => professor.name.toLowerCase().includes(searchParam)) : professors;

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
        {professorsToDisplay.map((professor) => {
          return (
            <div key={professor.id} className="professor">
              <h4>{professor.name}</h4>
              <h5>{professor.departmentId}</h5>
              <h5>{professor.bio}</h5>
              <h5>{professor.email}</h5>
              <img
                src={professor.image}
                alt={professor.name}
                className="profPics"
              />
              <br />
              <br />
              <br />
            </div>
          );
        })}
        ;
      </div>
    </>
     );
}
 
export default Professors;