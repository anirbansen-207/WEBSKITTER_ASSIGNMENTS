import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* ================= HEADER ================= */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          mb: 1,
        }}
      >
        Customer Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 4,
        }}
      >
        Welcome to Shamolly Bus Service.
      </Typography>

      {/* ================= ACTION CARDS ================= */}

      <Grid container spacing={3}>
        {/* Book Ticket */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
              >
                Book Your Ticket
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mb: 3,
                }}
              >
                View available trips, select your seats and
                create your bus booking.
              </Typography>

              <Button
                variant="contained"
                onClick={() =>
                  navigate("/customer/trips")
                }
              >
                BOOK TICKET
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* My Bookings */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
              >
                My Bookings
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mb: 3,
                }}
              >
                View your current and previous bus bookings.
              </Typography>

              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/customer/bookings")
                }
              >
                MY BOOKINGS
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* My Tickets */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
              >
                My Tickets
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mb: 3,
                }}
              >
                View your generated tickets and booking
                information.
              </Typography>

              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/customer/tickets")
                }
              >
                MY TICKETS
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDashboard;