import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import FilterButtons from "./components/FilterButtons";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./services/taskApi";
import "./styles/app.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingTask) {
      await updateTask(editingTask.id, {
        ...editingTask,
        title,
        description,
      });

      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id
            ? { ...t, title, description }
            : t
        )
      );

      setEditingTask(null);
    } else {
      const newTask = await addTask({ title, description });
      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
  };

  const handleToggle = async (task) => {
    await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });

    setTasks(
      tasks.map((t) =>
        t.id === task.id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="app">
     <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "24px" }}>
  Organize your tasks efficiently
</p>


      <FilterButtons setFilter={setFilter} />

      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        isEditing={!!editingTask}
      />

      <div className="task-list">
  {filteredTasks.map((task) => (
    <TaskCard
      key={task.id}
      task={task}
      onToggle={handleToggle}
      onEdit={(t) => {
        setEditingTask(t);
        setTitle(t.title);
        setDescription(t.description);
      }}
      onDelete={async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter((t) => t.id !== id));
      }}
    />
  ))}
</div>

    </div>
  );
}

export default App;
