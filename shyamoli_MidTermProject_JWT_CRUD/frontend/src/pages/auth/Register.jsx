import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../../services/authService";

const Register = () => {
  // Used to navigate to the OTP verification page later.
  const navigate = useNavigate();

  // Stores registration form values.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Used to show loading state on the button.
  const [loading, setLoading] = useState(false);

  // Handles changes in the input fields.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handles registration form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Send registration data to the backend.
      const response = await registerCustomer(formData);

      console.log("Registration successful:", response);

      /*
        Backend sends an OTP after registration.

        Later we will create VerifyOtp.jsx
        and navigate the user there.
      */
      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Customer Account</h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

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
            placeholder="Create a password"
            required
          />
        </div>

        {/* Register button */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;