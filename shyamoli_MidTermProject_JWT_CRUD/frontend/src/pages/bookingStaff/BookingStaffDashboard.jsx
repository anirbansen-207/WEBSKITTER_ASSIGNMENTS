import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const BookingStaffDashboard = () => {
  return (
    <Box>
      {/* Page heading */}
      <Typography variant="h5" fontWeight={600} mb={3}>
        Booking Staff Dashboard
      </Typography>

      <Grid container spacing={3}>

        {/* Create Booking */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create Offline Booking
              </Typography>

              <Typography color="text.secondary">
                Create a booking for a customer by selecting
                a trip and available seats.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* View Bookings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bookings
              </Typography>

              <Typography color="text.secondary">
                View and manage customer bookings.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default BookingStaffDashboard;