import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CustomerLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box>
      {/* Customer Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Customer Section
          </Typography>

          <Button
            color="inherit"
            onClick={() => navigate("/customer")}
          >
            Dashboard
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/customer/trips")}
          >
            Trips
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/customer/bookings")}
          >
            My Bookings
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/customer/tickets")}
          >
            My Tickets
          </Button>

          <Typography sx={{ mx: 2 }}>
            {user?.name}
          </Typography>

          <Button
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Customer pages will render here */}
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default CustomerLayout;