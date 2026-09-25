import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {ROLES} from "../../utils/roles";

const Login = () => {
  // Used to navigate to another page after login.
  const navigate = useNavigate();

  // Get the login function and loading state
  // from AuthContext.
  const { login, loading } = useAuth();

  // Stores the values entered in the login form.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  // Handles changes in the input fields.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handles form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // AuthContext sends the login request
      // to our backend.
      const response = await login(formData);

      console.log("Login successful:", response);

      // Get the logged-in user from login response.
      const loggedInUser = response.data
      
      // Send the user to the dashboard
      // according to their role.
      switch (loggedInUser.role) {
        case ROLES.CUSTOMER:
          navigate("/customer");
          break;

        case ROLES.BOOKING_STAFF:
          navigate("/booking-staff");
          break;

        case ROLES.DRIVER:
          navigate("/driver");
          break;

        case ROLES.SUPER_ADMIN:
          navigate("/super-admin");
          break;

        default:
          navigate("/login");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h1>Shyamolly Bus Booking Management Login</h1>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label>Role</label>

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="booking_staff">Booking Staff</option>
            <option value="driver">Driver</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>

        {/* Login button */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
