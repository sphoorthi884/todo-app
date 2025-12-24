function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="task-card">
      <h3 className={task.completed ? "completed" : ""}>
        {task.title}
      </h3>

      <p>{task.description}</p>
      <p>Status: {task.completed ? "Completed" : "Pending"}</p>

      <div className="actions">
        <button onClick={() => onToggle(task)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
