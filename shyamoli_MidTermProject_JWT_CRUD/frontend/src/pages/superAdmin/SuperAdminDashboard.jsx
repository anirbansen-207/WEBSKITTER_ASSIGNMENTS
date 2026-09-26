import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RouteIcon from "@mui/icons-material/Route";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EventIcon from "@mui/icons-material/Event";

import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const managementItems = [
    {
      title: "Routes",
      description:
        "Create, update and manage bus routes.",
      icon: <RouteIcon />,
      path: "/super-admin/routes",
    },
    {
      title: "Buses",
      description:
        "Manage buses and their information.",
      icon: <DirectionsBusIcon />,
      path: "/super-admin/buses",
    },
    {
      title: "Seat Layouts",
      description:
        "Configure and manage bus seat layouts.",
      icon: <EventSeatIcon />,
      path: "/super-admin/seat-layouts",
    },
    {
      title: "Drivers",
      description:
        "Manage drivers and assigned trips.",
      icon: <PersonIcon />,
      path: "/super-admin/drivers",
    },
    {
      title: "Booking Staff",
      description:
        "Manage booking staff accounts.",
      icon: <GroupsIcon />,
      path: "/super-admin/booking-staff",
    },
    {
      title: "Customers",
      description:
        "View and manage registered customers.",
      icon: <PeopleIcon />,
      path: "/super-admin/customers",
    },
    {
      title: "Trips",
      description:
        "Create and manage scheduled trips.",
      icon: <EventIcon />,
      path: "/super-admin/trips",
    },
    {
      title: "Bookings",
      description:
        "View and manage all bookings.",
      icon: <ConfirmationNumberIcon />,
      path: "/super-admin/bookings",
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
          background:
            "linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)",
          color: "white",
          overflow: "hidden",
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
                width: 55,
                height: 55,
                borderRadius: 2,
                backgroundColor:
                  "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DashboardIcon sx={{ fontSize: 32 }} />
            </Box>

            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
              >
                Super Admin Dashboard
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  opacity: 0.85,
                }}
              >
                Manage your entire bus booking
                system from one place.
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
            Manage routes, buses, seat layouts,
            drivers, booking staff, customers,
            trips and bookings.
          </Typography>
        </CardContent>
      </Card>

      {/* ================= MANAGEMENT ================= */}

      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          Management Overview
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Quickly access the main administration
          modules.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {managementItems.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
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
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
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

export default SuperAdminDashboard;