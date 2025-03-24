import { Link } from "react-router-dom";
import { FaUser, FaBriefcase, FaBookmark, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav className="flex flex-col gap-6">
        <Link to="/profile" className="flex items-center gap-3 hover:text-blue-400">
          <FaUser /> Profile
        </Link>
        <Link to="/applications" className="flex items-center gap-3 hover:text-blue-400">
          <FaBriefcase /> My Applications
        </Link>
        <Link to="/saved-jobs" className="flex items-center gap-3 hover:text-blue-400">
          <FaBookmark /> Saved Jobs
        </Link>
        <Link to="/settings" className="flex items-center gap-3 hover:text-blue-400">
          <FaCog /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
