import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  // Get the currently logged-in user
  // from AuthContext.
  const { user, loading } = useAuth();

  // While authentication information
  // is being checked, don't redirect yet.
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  // If there is no logged-in user,
  // send the user to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /*
    User is authenticated.

    Outlet will render whichever protected
    child route matches the current URL.
  */
  return <Outlet />;
};

export default ProtectedRoute;