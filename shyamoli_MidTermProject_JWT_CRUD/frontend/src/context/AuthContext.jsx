import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser, refreshToken } from "../services/authService";

// create Auth context
const AuthContext = createContext(null);

/*
AuthProvider gives authentication data to all components inside it.
*/
export const AuthProvider = ({ children }) => {
  // Stores the currently logged in user
  const [user, setUser] = useState(null);

  // used to know if authentication operation is in progress
  const [loading, setLoading] = useState(true);

  // Restore Authentication using refresh token
  useEffect(() => {
    const restoreAuthentication = async () => {
      try {
        // Ask backend whether the existing
        // refresh-token session is valid.
        const response = await refreshToken();

        // Store the returned user in React state.
        setUser(response.data?.user || response.user || null);
      } catch (error) {
        // No valid refresh-token session.
        //
        // This is normal when the user is simply
        // visiting the website without logging in.
        setUser(null);
      } finally {
        // Authentication checking is finished.
        setLoading(false);
      }
    };

    restoreAuthentication();
  }, []);

  // login function
  const login = async (loginData) => {
    try {
      // Creates our frontend login function.
      setLoading(true);

      // call login API in express and stores everything in response
      const response = await loginUser(loginData);

      // Backend creates the jwt and send it to cookies
      setUser(response.data);

      return response;
    } finally {
      setLoading(false);
    }
  };

  // logout function
  const logout = async () => {
    try {
      // Creates our frontend logout function
      setLoading(true);

      // Call logout API
      await logoutUser();

      // remove user from context
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthContext;
