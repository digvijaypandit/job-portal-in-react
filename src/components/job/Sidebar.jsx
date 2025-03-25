import { Link } from "react-router-dom";
import JobCard from "./JobCard";

const Sidebar = () => {
  return (
    <div className="w-1/3 p-4 border-r overflow-y-auto">
      <JobCard />
    </div>
  );
};

export default Sidebar;
