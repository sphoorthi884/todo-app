import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Learn React",
    description: "Understand components and props",
    completed: false
  }
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});
app.get("/", (req, res) => {
  res.send("Todo Backend API is running");
});

app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    description,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description, completed } = req.body;

  tasks = tasks.map(task =>
    task.id === id ? { ...task, title, description, completed } : task
  );

  res.json({ message: "Task updated" });
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(task => task.id !== id);

  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
