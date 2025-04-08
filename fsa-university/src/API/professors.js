const API = "http://localhost:3000/professors";

// get /professors
export const getProfessors = async () => {
  try {
    const response = await fetch(API);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Uh oh, trouble fetching professors!", err);
  }
};

// get /professors/:id
export const getSingleProfessor = async (professorId) => {
  try {
    const response = await fetch(`${API}/${professorId}`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(`Uh oh, trouble fetching professor ${professorId}!`, err);
  }
};

// get /professors/:id/department
export const getProfessorDepartment = async (professorId) => {
  try {
    const response = await fetch(`${API}/${professorId}/department`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Cannot get professor department", err);
  }
};

// post /professors
export const addProfessor = async (professorId, token) => {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ professorId }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Cannot add professor", err);
  }
};

// put /professors/:id
export const updateProfessor = async (professorId, token) => {
  try {
    const response = await fetch(`${API}/${professorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ professorId }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Cannot update professor", err);
  }
};

// delete /professors/:id
export const removeProfessor = async (professorId, token) => {
  try {
    const response = await fetch(`${API}/${professorId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ professorId }),
    });
  } catch (err) {
    console.error(`Whoops, trouble removing department ${professorId}!`, err);
  }
};

// put /professors/:professorId/change-department/:newDepartmentId
export const changeProfessorDepartment = async (
  professorId,
  token,
  newDepartmentId
) => {
  try {
    const response = await fecth(
      `${API}/${professorId}/change-department/${newDepartmentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newDepartmentId, professorId }),
      }
    );
  } catch (err) {
    console.error("Cannot change the department of this professor", err);
  }
};
