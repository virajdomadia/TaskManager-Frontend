const TaskCard = ({ task, onEdit, onDelete }) => {
  // Normalize status to lowercase for consistent styling
  const status = task.status.toLowerCase();

  // Map status to colors
  const statusColors = {
    pending: "bg-yellow-500 text-white",
    "in progress": "bg-blue-500 text-white",
    completed: "bg-green-500 text-white",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border">
      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>

      {/* Task Status */}
      <div className="mt-2">
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
            statusColors[status] || "bg-gray-400 text-white"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 hover:text-blue-800 font-medium transition"
          aria-label="Edit Task"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:text-red-800 font-medium transition"
          aria-label="Delete Task"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
