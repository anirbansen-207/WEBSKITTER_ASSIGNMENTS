import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";

import busHero from "../../assets/bus-hero.png";

const Login = () => {
  const navigate = useNavigate();

  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  // Error message shown to the user
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Clear previous login error
    setError("");
  };

  // Handle login
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous error
    setError("");

    try {
      const response = await login(formData);

      const loggedInUser = response.data;

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
          navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);

      // Get backend error message
      const backendMessage =
        error?.response?.data?.message;

      // Show backend message to the user
      setError(
        backendMessage ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: {
          xs: "auto",
          md: "calc(100vh - 72px)",
        },
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(${busHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,18,42,0.94) 0%, rgba(5,18,42,0.78) 38%, rgba(5,18,42,0.15) 75%, rgba(5,18,42,0.05) 100%)",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1280,
          mx: "auto",
          px: {
            xs: 2,
            sm: 4,
            md: 6,
          },
          py: {
            xs: 5,
            md: 8,
          },
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Left text */}
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "48%",
            },
            color: "white",
            mr: {
              md: 5,
            },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 3,
              fontWeight: 600,
              color: "#fbbf24",
            }}
          >
            TRAVEL WITH CONFIDENCE
          </Typography>

          <Typography
            variant="h1"
            sx={{
              mt: 1,
              fontWeight: 800,
              fontSize: {
                xs: "2.6rem",
                sm: "3.5rem",
                md: "4.5rem",
              },
              lineHeight: 1.05,
            }}
          >
            Shamolly
            <br />
            Bus Service
          </Typography>

          <Typography
            sx={{
              mt: 3,
              maxWidth: 500,
              fontSize: {
                xs: "1rem",
                md: "1.15rem",
              },
              lineHeight: 1.7,
              color:
                "rgba(255,255,255,0.82)",
            }}
          >
            Book your journey, choose your seat,
            manage your booking and keep your
            digital ticket in one place.
          </Typography>
        </Box>

        {/* Login Card */}
        <Card
          elevation={12}
          sx={{
            width: {
              xs: "100%",
              md: 420,
            },
            maxWidth: 420,
            ml: {
              md: "auto",
            },
            mt: {
              xs: 5,
              md: 0,
            },
            borderRadius: 3,
            backgroundColor:
              "rgba(255,255,255,0.98)",
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 3,
                sm: 4,
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 2,
                backgroundColor: "#08152f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <LockOutlinedIcon
                sx={{
                  color: "white",
                }}
              />
            </Box>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              Welcome Back
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5, mb: 3 }}
            >
              Login to your account
            </Typography>

            {/* Login Error */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 2.5,
                }}
              >
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                sx={{ mb: 2 }}
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                sx={{ mb: 2 }}
              />

              {/* Role */}
              <FormControl
                fullWidth
                required
                sx={{ mb: 3 }}
              >
                <InputLabel id="role-label">
                  Role
                </InputLabel>

                <Select
                  labelId="role-label"
                  name="role"
                  value={formData.role}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value="customer">
                    Customer
                  </MenuItem>

                  <MenuItem value="booking_staff">
                    Booking Staff
                  </MenuItem>

                  <MenuItem value="driver">
                    Driver
                  </MenuItem>

                  <MenuItem value="super_admin">
                    Super Admin
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Login */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  backgroundColor: "#08152f",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#102653",
                  },
                }}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </Button>

              {/* Register */}
              <Box
                sx={{
                  textAlign: "center",
                  mt: 2.5,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Don't have an account?
                </Typography>

                <Button
                  variant="text"
                  onClick={() =>
                    navigate("/register")
                  }
                  sx={{
                    mt: 0.3,
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Create an account
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;