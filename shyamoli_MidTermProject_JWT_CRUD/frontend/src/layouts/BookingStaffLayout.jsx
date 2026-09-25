import { Outlet, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";

const BookingStaffLayout = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  // Booking Staff navigation
  const menuItems = [
    {
      label: "Dashboard",
      path: "/booking-staff",
    },
    {
      label: "Create Booking",
      path: "/booking-staff/create-booking",
    },
    {
      label: "Bookings",
      path: "/booking-staff/bookings",
    },
  ];

  // Logout
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          borderRight: "1px solid #ddd",
          p: 2,
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 3 }}>
          <strong>Shamolly</strong>
        </Box>

        {/* Navigation */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemText
                primary={item.label}
              />
            </ListItemButton>
          ))}
        </List>

        {/* Logout */}
        <Box sx={{ mt: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{ flex: 1 }}>
        {/* Top bar */}
        <Box
          sx={{
            height: 64,
            borderBottom: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: 3,
          }}
        >
          <Box>
            {user?.name || "Booking Staff"}
          </Box>
        </Box>

        {/* Page content */}
        <Box sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default BookingStaffLayout;