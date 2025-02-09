import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "./TaskForm";
import API from "../utils/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch Tasks from API
  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Task (Optimized without extra API call)
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Update state locally
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle Task Editing
  const editTask = (task) => setEditingTask(task);
  const closeEditForm = () => setEditingTask(null);

  useEffect(() => {
    fetchTasks();
    return () => {}; // Cleanup function (if needed)
  }, []);

  // Categorize tasks
  const groupedTasks = {
    pending: tasks.filter((task) => task.status.toLowerCase() === "pending"),
    inProgress: tasks.filter(
      (task) => task.status.toLowerCase() === "in progress"
    ),
    completed: tasks.filter(
      (task) => task.status.toLowerCase() === "completed"
    ),
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Task Dashboard</h1>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
            <TaskForm
              fetchTasks={fetchTasks}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              closeEditForm={closeEditForm}
            />
            <button
              onClick={closeEditForm}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
              aria-label="Close Edit Form"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="p-4 bg-gray-100 rounded min-h-[200px]">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {status.replace("-", " ")}
            </h2>
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks {status}.</p>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={editTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
