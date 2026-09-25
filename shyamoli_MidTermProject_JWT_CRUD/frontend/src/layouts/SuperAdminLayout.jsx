import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const SuperAdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {/* Admin Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Shyamolly Admin
          </Typography>

          {/* Dashboard */}
          <Button color="inherit" onClick={() => navigate("/super-admin")}>
            Dashboard
          </Button>

          {/* Routes */}
          <Button
            color="inherit"
            onClick={() => navigate("/super-admin/routes")}
          >
            Routes
          </Button>

          {/* Buses */}
          <Button
            color="inherit"
            onClick={() => navigate("/super-admin/buses")}
          >
            Buses
          </Button>

          {/* Seat Layout */}
          <Button
            color="inherit"
            onClick={() => navigate("/super-admin/seat-layout")}
          >
            Seat Layout
          </Button>

          {/* Drivers */}
          <Button
            color="inherit"
            onClick={() => navigate("/super-admin/drivers")}
          >
            Drivers
          </Button>

          {/* Booking Staff */}
          <Button
            color="inherit"
            onClick={() => navigate("/super-admin/booking-staff")}
          >
            Booking Staff
          </Button>

          {/* Customers */}
          <Button
            color="inherit"
            onClick={() => navigate("/super-admin/customers")}
          >
            Customers
          </Button>

          {/* Bookings */}
          <Button
            color="inherit"
            onClick={() => navigate("/super-admin/bookings")}
          >
            Bookings
          </Button>

          {/* Trips */}
          <Button
            color="inherit"
            onClick={() => navigate("/super-admin/trips")}
          >
            Trips
          </Button>

          {/* Logged-in Admin Name */}
          <Typography sx={{ mx: 2 }}>{user?.name}</Typography>

          {/* Logout */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Child pages render here */}
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SuperAdminLayout;
