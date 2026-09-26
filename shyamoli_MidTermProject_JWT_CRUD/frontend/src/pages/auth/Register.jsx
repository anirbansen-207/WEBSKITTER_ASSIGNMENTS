import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import {
  Person,
  EmailOutlined,
  LockOutlined,
  PhoneOutlined,
  Visibility,
  VisibilityOff,
  ArrowBack,
} from "@mui/icons-material";

import { registerCustomer } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  // ================= FORM DATA =================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // ================= STATES =================

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ================= HANDLE INPUT =================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ================= REGISTER =================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // Basic frontend validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // Register customer
      await registerCustomer(formData);

      // After successful registration,
      // go to OTP verification page
      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 82px)",

        background:
          "linear-gradient(135deg, #f5f7fb 0%, #e9eef7 100%)",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* ================================================= */}
          {/* TOP SECTION */}
          {/* ================================================= */}

          <Box
            sx={{
              backgroundColor: "#07152f",
              color: "white",

              textAlign: "center",

              px: 3,
              py: 4,
            }}
          >
            {/* Person Icon */}

            <Box
              sx={{
                width: 64,
                height: 64,

                borderRadius: "50%",

                backgroundColor: "#263653",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                mx: "auto",
                mb: 2,
              }}
            >
              <Person
                sx={{
                  fontSize: 34,
                }}
              />
            </Box>

            {/* Heading */}

            <Typography
              variant="h4"
              fontWeight={700}
            >
              Create Account
            </Typography>

            {/* Subtitle */}

            <Typography
              sx={{
                mt: 1,
                color: "#b8c2d6",
              }}
            >
              Create your Shamolly Bus Service account
            </Typography>
          </Box>

          {/* ================================================= */}
          {/* FORM SECTION */}
          {/* ================================================= */}

          <CardContent
            sx={{
              p: {
                xs: 3,
                md: 4,
              },
            }}
          >
            {/* Error */}

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                }}
              >
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              {/* ================================================= */}
              {/* NAME */}
              {/* ================================================= */}

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                placeholder="Enter your full name"
                autoComplete="name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />

              {/* ================================================= */}
              {/* EMAIL */}
              {/* ================================================= */}

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                placeholder="Enter your email"
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                }}
              />

              {/* ================================================= */}
              {/* PHONE */}
              {/* ================================================= */}

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                placeholder="Enter your phone number"
                autoComplete="tel"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlined />
                    </InputAdornment>
                  ),
                }}
              />

              {/* ================================================= */}
              {/* PASSWORD */}
              {/* ================================================= */}

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                placeholder="Create a password"
                autoComplete="new-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(
                            (previous) =>
                              !previous
                          )
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* ================================================= */}
              {/* REGISTER BUTTON */}
              {/* ================================================= */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,

                  borderRadius: 2,

                  backgroundColor: "#07152f",

                  fontSize: 16,
                  fontWeight: 600,

                  "&:hover": {
                    backgroundColor: "#10254b",
                  },
                }}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>

              {/* ================================================= */}
              {/* LOGIN DIVIDER */}
              {/* ================================================= */}

              <Divider
                sx={{
                  my: 3,
                }}
              >
                Already have an account?
              </Divider>

              {/* ================================================= */}
              {/* LOGIN BUTTON */}
              {/* ================================================= */}

              <Button
                fullWidth
                variant="outlined"
                onClick={() =>
                  navigate("/login")
                }
                sx={{
                  py: 1.3,

                  borderRadius: 2,

                  borderColor: "#07152f",
                  color: "#07152f",

                  fontWeight: 600,

                  "&:hover": {
                    borderColor: "#07152f",
                    backgroundColor: "#f2f5fa",
                  },
                }}
              >
                Login
              </Button>

              {/* ================================================= */}
              {/* BACK TO HOME */}
              {/* ================================================= */}

              <Button
                fullWidth
                startIcon={<ArrowBack />}
                onClick={() => navigate("/")}
                sx={{
                  mt: 1,
                  color: "#526079",
                }}
              >
                Back to Home
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;