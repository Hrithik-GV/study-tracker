const API_BASE_URL = "http://localhost:3001/api/subject";

export const getSubjectsService = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
  }

  return data;
};

export const addSubjectService = async (userId, { subjectName, duration, topic }) => {
  const response = await fetch(`${API_BASE_URL}/add-subject/${userId}`, {
    method: "POST",
    headers: {  
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ subjectName, duration, topic })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
  }

  return data;
};

export const updateSubjectService = async (id, { subjectName, duration, topic }) => {
  const response = await fetch(`${API_BASE_URL}/${id}/update-subject`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ subjectName, duration, topic })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
  }

  return data;
};

export const deleteSubjectService = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
  }

  return data;
};