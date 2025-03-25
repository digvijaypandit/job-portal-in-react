import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-600 text-white">
      <Link to="/" className="text-lg font-bold">Job Search</Link>
    </nav>
  );
};

export default Navbar;
