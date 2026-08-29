export const addSubjectService = async ({ subjectName, duration, topic }) => {
  const response = await fetch("http://localhost:3001/api/subject/add-subject", {
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