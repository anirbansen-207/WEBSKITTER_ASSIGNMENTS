import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowedRoles }) => {
  // Get the currently logged-in user.
  const { user } = useAuth();

  // Check whether the user's role
  // exists inside the allowed roles.
  if (!allowedRoles.includes(user.role)) {
    // User is logged in but does not have
    // permission to access this route.
    return <Navigate to="/" replace />;
  }

  // User has the required role.
  // Render the protected child route.
  return <Outlet />;
};

export default RoleRoute;