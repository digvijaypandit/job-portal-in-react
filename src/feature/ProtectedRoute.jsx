import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;
  if (!user.roles?.some((role) => allowedRoles.includes(role)))
    return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoute;
