import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import { useAuth } from "../context/AuthContext";

import busHero from "../assets/bus-hero.png";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        backgroundImage: `url(${busHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Dark overlay */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,18,42,0.94) 0%, rgba(5,18,42,0.78) 38%, rgba(5,18,42,0.20) 75%, rgba(5,18,42,0.05) 100%)",
        }}
      />

      {/* Content */}

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            maxWidth: 650,
            color: "white",
            py: {
              xs: 7,
              md: 10,
            },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#fbbf24",
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            YOUR JOURNEY STARTS HERE
          </Typography>

          <Typography
            variant="h1"
            fontWeight={800}
            sx={{
              mt: 1,
              fontSize: {
                xs: "2.8rem",
                sm: "4rem",
                md: "5rem",
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
              maxWidth: 570,
              fontSize: {
                xs: "1rem",
                md: "1.15rem",
              },
              lineHeight: 1.8,
              color:
                "rgba(255,255,255,0.82)",
            }}
          >
            A simple and reliable platform for
            managing bus journeys, seats, bookings,
            passengers and digital tickets.
          </Typography>

          {/* Buttons */}

          {!user && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 4,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: 2,
                  backgroundColor: "#f59e0b",
                  color: "#08152f",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#fbbf24",
                  },
                }}
              >
                Login
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() =>
                  navigate("/register")
                }
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: 2,
                  color: "white",
                  borderColor:
                    "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor:
                      "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Create Account
              </Button>
            </Box>
          )}

          {user && (
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                if (user.role === "customer") {
                  navigate("/customer");
                } else if (
                  user.role === "booking_staff"
                ) {
                  navigate("/booking-staff");
                } else if (
                  user.role === "driver"
                ) {
                  navigate("/driver");
                } else if (
                  user.role === "super_admin"
                ) {
                  navigate("/super-admin");
                }
              }}
              sx={{
                mt: 4,
                px: 4,
                py: 1.4,
                borderRadius: 2,
                backgroundColor: "#f59e0b",
                color: "#08152f",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#fbbf24",
                },
              }}
            >
              Go to Dashboard
            </Button>
          )}
        </Box>

        {/* Feature cards */}

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            pb: 5,
          }}
        >
          {[
            {
              icon: <DirectionsBusIcon />,
              title: "Bus Management",
            },
            {
              icon: <EventSeatIcon />,
              title: "Easy Seat Booking",
            },
            {
              icon: <ConfirmationNumberIcon />,
              title: "Digital Tickets",
            },
          ].map((item) => (
            <Box
              key={item.title}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                backgroundColor:
                  "rgba(255,255,255,0.10)",
                backdropFilter: "blur(8px)",
                border:
                  "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {item.icon}

              <Typography
                fontWeight={600}
                fontSize={14}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;