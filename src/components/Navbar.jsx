import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("user"); // Remove stored user data if applicable
    navigate("/login");
    window.location.reload(); // Ensure fresh state
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left Side - Navigation Links */}
      <div className="flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${
              isActive
                ? "bg-white text-blue-600 font-bold"
                : "hover:bg-white hover:text-blue-600"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${
              isActive
                ? "bg-white text-blue-600 font-bold"
                : "hover:bg-white hover:text-blue-600"
            }`
          }
        >
          Tasks
        </NavLink>
      </div>

      {/* Right Side - Login/Logout Button */}
      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
