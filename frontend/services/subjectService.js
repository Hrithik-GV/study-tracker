const API_BASE_URL = "http://localhost:3001/api/subject";

export const getSubjectsService = async () => {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const addSubjectService = async ({ subjectName, duration, topic }) => {
  const response = await fetch(`${API_BASE_URL}/add-subject`, {
    method: "POST",
    headers: {  
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ subjectName, duration, topic })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateSubjectService = async (id, { subjectName, duration, topic }) => {
  const response = await fetch(`${API_BASE_URL}/${id}/update-subject`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ subjectName, duration, topic })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const deleteSubjectService = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};