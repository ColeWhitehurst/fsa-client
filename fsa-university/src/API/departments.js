const API = "http://localhost:3000/api/departments";

// get /departments
export const getDepartments = async () => {
  try {
    const response = await fetch(API);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Uh oh, trouble fetching departments!", err);
  }
};

// get /departments/:id
export const getSingleDepartment = async (departmentId) => {
  try {
    const response = await fetch(`${API}/${departmentId}`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(`Uh oh, trouble fetching department ${departmentId}!`, err);
  }
};

// get /departments/:id/professors
export const getDepartmentProfessors = async (departmentId) => {
  try {
    const response = await fetch(`${API}/${departmentId}/professors`);
    const result = response.json();
    return result;
  } catch (err) {
    console.error(
      `Uh oh, trouble fetching professors from department ${departmentId}!`,
      err
    );
  }
};

// post /departments
export const addDepartment = async (departmentId, token) => {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ departmentId }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Cannot add department", err);
  }
};

// put /departments/:id
export const updateDepartment = async (departmentId, token) => {
  try {
    const response = await fetch(`${API}/${departmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ departmentId }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Cannot update department", err);
  }
};

// delete /departments/:id
export const removeDepartment = async (departmentId, token) => {
  try {
    const response = await fetch(`${API}/${departmentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ departmentId }),
    });
  } catch (err) {
    console.error(`Whoops, trouble removing department ${departmentId}!`, err);
  }
};

// post /departments/:id/professors
export const addDepartmentProfessor = async (departmentId, token) => {
  try {
    const response = await fetch(`${API}/${departmentId}/professors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ departmentId }),
    });
  } catch (err) {
    console.error(`Cannot add professor to department ${departmentId}`);
  }
};

/// put /departments/:departmentId/remove-professor/:professorId
export const removeDepartmentProfessor = async (
  departmentId,
  professorId,
  token
) => {
  try {
    const response = await fetch(
      `${API}/${departmentId}/remove-professor/${professorId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ departmentId, professorId }),
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Cannot remove professor from department", err);
  }
};
