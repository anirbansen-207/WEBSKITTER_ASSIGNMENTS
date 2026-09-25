import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  verifyOtp,
  resendOtp,
} from "../../services/authService";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the email passed from Register.jsx.
  const email = location.state?.email;

  // Stores the OTP entered by the user.
  const [otp, setOtp] = useState("");

  // Loading state for OTP verification.
  const [loading, setLoading] = useState(false);

  // Loading state for resend OTP.
  const [resendLoading, setResendLoading] = useState(false);

  // If the user directly opens /verify-otp
  // without coming from Register.jsx,
  // there will be no email.
  if (!email) {
    return (
      <div>
        <h2>Registration Required</h2>

        <p>
          Please register your account first.
        </p>

        <button onClick={() => navigate("/register")}>
          Go to Register
        </button>
      </div>
    );
  }

  // Handles OTP verification.
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Send email and OTP to the backend.
      const response = await verifyOtp({
        email,
        otp,
      });

      console.log("Account verified:", response);

      // Account verification is complete.
      // Send the user to the login page.
      navigate("/login");
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handles requesting a new OTP.
  const handleResendOtp = async () => {
    try {
      setResendLoading(true);

      // Send the email to the backend.
      const response = await resendOtp({
        email,
      });

      console.log("OTP resent:", response);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div>
      <h1>Verify Your Account</h1>

      <p>
        Enter the OTP sent to:
      </p>

      <p>{email}</p>

      <form onSubmit={handleSubmit}>
        {/* OTP input */}
        <div>
          <label>OTP</label>

          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            placeholder="Enter OTP"
            maxLength={6}
            required
          />
        </div>

        {/* Verify button */}
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Account"}
        </button>
      </form>

      {/* Resend OTP */}
      <div>
        <p>Didn't receive the OTP?</p>

        <button
          type="button"
          onClick={handleResendOtp}
          disabled={resendLoading}
        >
          {resendLoading ? "Sending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;