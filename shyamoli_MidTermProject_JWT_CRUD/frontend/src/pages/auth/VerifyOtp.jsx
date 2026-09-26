import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import {
  MarkEmailReadOutlined,
  ArrowBack,
} from "@mui/icons-material";

import {
  verifyOtp,
  resendOtp,
} from "../../services/authService";

const VerifyOtp = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const emailFromState =
    location.state?.email || "";

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);

  const [resendLoading, setResendLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [resendTimer, setResendTimer] =
    useState(30);

  const inputRefs = useRef([]);

  // ================= TIMER =================

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // ================= OTP CHANGE =================

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    const numericValue =
      value.replace(/\D/g, "");

    if (numericValue.length > 1) {
      return;
    }

    const updatedOtp = [...otp];

    updatedOtp[index] = numericValue;

    setOtp(updatedOtp);

    setError("");
    setSuccess("");

    // Move to next input
    if (
      numericValue &&
      index < otp.length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ================= BACKSPACE =================

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ================= PASTE OTP =================

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedData =
      event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pastedData) {
      return;
    }

    const updatedOtp = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    pastedData.split("").forEach(
      (digit, index) => {
        updatedOtp[index] = digit;
      }
    );

    setOtp(updatedOtp);

    const nextIndex = Math.min(
      pastedData.length,
      5
    );

    inputRefs.current[nextIndex]?.focus();
  };

  // ================= VERIFY =================

  const handleVerify = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError(
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    if (!emailFromState) {
      setError(
        "Email information is missing. Please register again."
      );
      return;
    }

    try {
      setLoading(true);

      await verifyOtp({
        email: emailFromState,
        otp: otpValue,
      });

      setSuccess(
        "Account verified successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Invalid or expired OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= RESEND OTP =================

  const handleResend = async () => {
    if (resendTimer > 0) {
      return;
    }

    if (!emailFromState) {
      setError(
        "Email information is missing. Please register again."
      );
      return;
    }

    try {
      setResendLoading(true);

      setError("");
      setSuccess("");

      await resendOtp({
        email: emailFromState,
      });

      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      setResendTimer(30);

      setSuccess(
        "A new OTP has been sent to your email."
      );

      inputRefs.current[0]?.focus();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to resend OTP."
      );
    } finally {
      setResendLoading(false);
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
          {/* TOP */}

          <Box
            sx={{
              backgroundColor: "#07152f",
              color: "white",
              textAlign: "center",
              px: 3,
              py: 4,
            }}
          >
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
              <MarkEmailReadOutlined
                sx={{ fontSize: 34 }}
              />
            </Box>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              Verify Your Email
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#b8c2d6",
              }}
            >
              Enter the OTP sent to your email
            </Typography>
          </Box>

          <CardContent
            sx={{
              p: {
                xs: 3,
                md: 4,
              },
            }}
          >
            {/* EMAIL */}

            <Box
              sx={{
                textAlign: "center",
                mb: 3,
              }}
            >
              <Typography
                color="text.secondary"
              >
                OTP sent to
              </Typography>

              <Typography
                fontWeight={700}
                sx={{ mt: 0.5 }}
              >
                {emailFromState ||
                  "your email address"}
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{ mb: 3 }}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                sx={{ mb: 3 }}
              >
                {success}
              </Alert>
            )}

            {/* OTP FORM */}

            <Box
              component="form"
              onSubmit={handleVerify}
            >
              <Typography
                textAlign="center"
                fontWeight={600}
                sx={{ mb: 2 }}
              >
                Enter 6-digit OTP
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: {
                    xs: 1,
                    sm: 1.5,
                  },
                  mb: 3,
                }}
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={(element) => {
                      inputRefs.current[index] =
                        element;
                    }}
                    value={digit}
                    onChange={(event) =>
                      handleOtpChange(
                        index,
                        event.target.value
                      )
                    }
                    onKeyDown={(event) =>
                      handleKeyDown(
                        index,
                        event
                      )
                    }
                    inputProps={{
                      maxLength: 1,
                      inputMode: "numeric",
                      style: {
                        textAlign: "center",
                        fontSize: "24px",
                        fontWeight: 700,
                        padding: "12px 0",
                      },
                    }}
                    sx={{
                      width: {
                        xs: 42,
                        sm: 52,
                      },

                      "& .MuiOutlinedInput-root":
                        {
                          borderRadius: 2,
                        },
                    }}
                  />
                ))}
              </Box>

              {/* VERIFY */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
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
                  ? "Verifying..."
                  : "Verify Account"}
              </Button>

              {/* RESEND */}

              <Box
                sx={{
                  textAlign: "center",
                  mt: 3,
                }}
              >
                <Typography
                  color="text.secondary"
                  fontSize={14}
                >
                  Didn't receive the OTP?
                </Typography>

                <Button
                  onClick={handleResend}
                  disabled={
                    resendTimer > 0 ||
                    resendLoading
                  }
                  sx={{
                    mt: 0.5,
                    fontWeight: 600,
                  }}
                >
                  {resendLoading
                    ? "Sending..."
                    : resendTimer > 0
                    ? `Resend OTP in ${resendTimer}s`
                    : "Resend OTP"}
                </Button>
              </Box>

              {/* BACK TO LOGIN */}

              <Button
                fullWidth
                startIcon={<ArrowBack />}
                onClick={() =>
                  navigate("/login")
                }
                sx={{
                  mt: 2,
                  color: "#526079",
                }}
              >
                Back to Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default VerifyOtp;