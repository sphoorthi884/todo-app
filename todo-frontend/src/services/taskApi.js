const API_URL = "https://todo-backend-wnm2.onrender.com/tasks"

export const getTasks = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addTask = async (task) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, task) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
