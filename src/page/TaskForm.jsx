import { useState, useEffect, useRef } from "react";
import API from "../utils/api";

const TaskForm = ({
  fetchTasks,
  editingTask,
  setEditingTask,
  closeEditForm,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const titleRef = useRef(null); // Ref for autofocus

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
    } else {
      resetForm();
    }

    if (titleRef.current) titleRef.current.focus(); // Autofocus title field
  }, [editingTask]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Low");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, {
          title,
          description,
          status,
          priority,
        });
      } else {
        await API.post("/tasks", { title, description, status, priority });
        resetForm(); // Reset only if adding a new task
      }

      fetchTasks();
      closeEditForm();
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-4">
        {editingTask ? "Edit Task" : "Add Task"}
      </h3>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Title"
        className="border p-3 w-full rounded mb-2 focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
        required
      />

      <textarea
        placeholder="Description"
        className="border p-3 w-full rounded mb-2 focus:ring-2 focus:ring-blue-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <select
        className="border p-3 w-full rounded mb-2 focus:ring-2 focus:ring-blue-500"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        className="border p-3 w-full rounded mb-4 focus:ring-2 focus:ring-blue-500"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className={`w-full text-white p-3 rounded-lg transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition"
            onClick={closeEditForm}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
