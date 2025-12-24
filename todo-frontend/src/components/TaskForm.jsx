function TaskForm({
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
  isEditing,
}) {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
