import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PrintIcon from "@mui/icons-material/Print";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import { useNavigate } from "react-router-dom";

const BookingStaffDashboard = () => {
  const navigate = useNavigate();

  const staffOptions = [
    {
      title: "Create Offline Booking",
      description:
        "Create a booking for a customer and select available seats.",
      icon: <PointOfSaleIcon />,
      path: "/booking-staff/create-booking",
    },
    {
      title: "Bookings",
      description:
        "View and manage bookings handled by the booking staff.",
      icon: <ConfirmationNumberIcon />,
      path: "/booking-staff/bookings",
    },
    {
      title: "Print Ticket",
      description:
        "Generate and print customer tickets after booking.",
      icon: <PrintIcon />,
      path: "/booking-staff/print-ticket",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
      }}
    >
      {/* ================= HERO ================= */}

      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)",
          color: "white",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 3, md: 5 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: 2,
                backgroundColor:
                  "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DirectionsBusIcon
                sx={{ fontSize: 34 }}
              />
            </Box>

            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
              >
                Booking Staff Dashboard
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  opacity: 0.85,
                }}
              >
                Manage customer bookings and
                ticket operations.
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{
              mt: 2,
              maxWidth: 750,
              lineHeight: 1.7,
              opacity: 0.9,
            }}
          >
            Create offline bookings, manage
            reservations and generate customer
            tickets from one place.
          </Typography>
        </CardContent>
      </Card>

      {/* ================= QUICK ACTIONS ================= */}

      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          Quick Actions
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Select an operation to continue.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {staffOptions.map((item) => (
          <Grid
            item
            xs={12}
            md={4}
            key={item.title}
          >
            <Card
              onClick={() => navigate(item.path)}
              sx={{
                height: "100%",
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                cursor: "pointer",
                transition: "all 0.25s ease",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 5,
                  borderColor: "#1976d2",
                },
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    borderRadius: 2,
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {item.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    color: "#1976d2",
                    fontWeight: 600,
                  }}
                >
                  Open →
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookingStaffDashboard;