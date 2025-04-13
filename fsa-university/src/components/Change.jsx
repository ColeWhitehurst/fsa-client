import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addDepartment, updateDepartment, getDepartments } from "../API/departments";
import { addProfessor, updateProfessor, getProfessors } from "../API/professors";

const Change = () => {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [professors, setProfessors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [selectedProfessorId, setSelectedProfessorId] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [showProfUpdate, setShowProfUpdate] = useState(false);
  const [showDeptUpdate, setShowDeptUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await getDepartments();
        const professorsData = await getProfessors();
        setDepartments(departmentsData);
        setProfessors(professorsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProfessorId) {
      const prof = professors.find((p) => p.id === selectedProfessorId);
      if (prof) {
        setName(prof.name);
        setEmail(prof.email);
        setBio(prof.bio || "");
        setImage(prof.image || "");
        setDepartmentId(prof.department?.id || "");
      }
    }
  }, [selectedProfessorId]);

  useEffect(() => {
    if (selectedDepartmentId) {
      const dept = departments.find((d) => d.id === selectedDepartmentId);
      if (dept) {
        setName(dept.name);
        setEmail(dept.email);
        setDescription(dept.description || "");
        setImage(dept.image || "");
      }
    }
  }, [selectedDepartmentId]);

  async function handleProfessorAdd(e) {
    e.preventDefault();
    const APIResponse = await addProfessor(
      name,
      email,
      departmentId,
      image,
      localStorage.getItem("token")
    );
    setProfessors(APIResponse);
    navigate("/professors");
  }

  async function handleProfessorChange(e) {
    e.preventDefault();
    const APIResponse = await updateProfessor(
      name,
      email,
      bio,
      image,
      departmentId,
      localStorage.getItem("token")
    );
    setShowProfUpdate(false);
    navigate("/professors");
  }

  async function handleDepartmentAdd(e) {
    e.preventDefault();
    const APIResponse = await addDepartment(
      name,
      email,
      localStorage.getItem("token")
    );
    setDepartments(APIResponse);
    navigate("/departments");
  }

  async function handleDepartmentChange(e) {
    e.preventDefault();
    const APIResponse = await updateDepartment(
      name,
      email,
      description,
      image,
      selectedDepartmentId,
      localStorage.getItem("token")
    );
    setShowDeptUpdate(false);
    navigate("/departments");
  }

  return (
    <div className="container py-5 text-light">
      {localStorage.getItem("token") && (
        <>
          {/* Add Professor */}
          <form onSubmit={handleProfessorAdd} className="bg-dark p-4 rounded mb-5 shadow">
            <h4 className="mb-3">Add New Professor</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <input className="form-control" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <select className="form-select" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <input className="form-control" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <input className="form-control" value={image} placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
              </div>
              <div className="col-12">
                <button className="btn btn-danger w-100" type="submit">Add Professor</button>
              </div>
            </div>
          </form>

          {/* Add Department */}
          <form onSubmit={handleDepartmentAdd} className="bg-dark p-4 rounded mb-5 shadow">
            <h4 className="mb-3">Add New Department</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <input className="form-control" value={name} placeholder="Department Name" onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <input className="form-control" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="col-12">
                <input className="form-control" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className="col-12">
                <input className="form-control" value={image} placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
              </div>
              <div className="col-12">
                <button className="btn btn-danger w-100" type="submit">Add Department</button>
              </div>
            </div>
          </form>

          {/* Update Selectors */}
          <div className="mb-4">
            <label className="form-label">Select Professor to Update</label>
            <select className="form-select" value={selectedProfessorId} onChange={(e) => { setSelectedProfessorId(e.target.value); setShowProfUpdate(true); }}>
              <option value="">-- Choose a professor --</option>
              {professors.map((prof) => (
                <option key={prof.id} value={prof.id}>{prof.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">Select Department to Update</label>
            <select className="form-select" value={selectedDepartmentId} onChange={(e) => { setSelectedDepartmentId(e.target.value); setShowDeptUpdate(true); }}>
              <option value="">-- Choose a department --</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          {/* Update Department */}
          {showDeptUpdate && (
            <form onSubmit={handleDepartmentChange} className="bg-dark p-4 rounded mb-5 shadow">
              <h4 className="mb-3">Update Department</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <input className="form-control" value={name} placeholder="Department Name" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <input className="form-control" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="col-12">
                  <input className="form-control" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="col-12">
                  <input className="form-control" value={image} placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className="col-12">
                  <button className="btn btn-danger w-100" type="submit">Update Department</button>
                </div>
              </div>
            </form>
          )}

          {/* Update Professor */}
          {showProfUpdate && (
            <form onSubmit={handleProfessorChange} className="bg-dark p-4 rounded shadow">
              <h4 className="mb-3">Update Professor</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <input className="form-control" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <select className="form-select" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <input className="form-control" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <input className="form-control" value={image} placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className="col-12">
                  <textarea className="form-control" value={bio} placeholder="Bio (optional)" onChange={(e) => setBio(e.target.value)} rows="3" />
                </div>
                <div className="col-12">
                  <button className="btn btn-danger w-100" type="submit">Update Professor</button>
                </div>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Change;
