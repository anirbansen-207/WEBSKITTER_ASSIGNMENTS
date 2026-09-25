import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

const PrintTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const ticket = location.state?.ticket;

  // If ticket data is not available
  if (!ticket) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error" mb={2}>
          Ticket information not found.
        </Typography>

        <Button
          variant="outlined"
          onClick={() =>
            navigate("/booking-staff/bookings")
          }
        >
          Back to Bookings
        </Button>
      </Box>
    );
  }

  // Print ticket
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Buttons - hidden while printing */}
      <Box
        className="no-print"
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={handlePrint}
        >
          Print Ticket
        </Button>

        <Button
          variant="outlined"
          onClick={() =>
            navigate("/booking-staff/bookings")
          }
        >
          Back to Bookings
        </Button>
      </Box>

      {/* Ticket */}
      <Card
        id="print-ticket"
        sx={{
          maxWidth: 800,
          mx: "auto",
          border: "1px solid #ddd",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
              >
                Shamolly
              </Typography>

              <Typography color="text.secondary">
                Bus Ticket
              </Typography>
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Ticket Number
              </Typography>

              <Typography fontWeight={600}>
                {ticket.ticketNumber}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Passenger */}
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
          >
            Passenger Details
          </Typography>

          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography color="text.secondary">
                Passenger Name
              </Typography>

              <Typography fontWeight={600}>
                {ticket.customerName}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography color="text.secondary">
                Seat Number
              </Typography>

              <Typography fontWeight={600}>
                {ticket.seatNumbers?.join(", ") || "-"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} />

          {/* Journey */}
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
          >
            Journey Details
          </Typography>

          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography color="text.secondary">
                From
              </Typography>

              <Typography fontWeight={600}>
                {ticket.sourceCity}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography color="text.secondary">
                To
              </Typography>

              <Typography fontWeight={600}>
                {ticket.destinationCity}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography color="text.secondary">
                Travel Date
              </Typography>

              <Typography fontWeight={600}>
                {ticket.travelDate
                  ? new Date(
                      ticket.travelDate
                    ).toLocaleDateString()
                  : "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography color="text.secondary">
                Departure
              </Typography>

              <Typography fontWeight={600}>
                {ticket.departureTime
                  ? new Date(
                      ticket.departureTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography color="text.secondary">
                Arrival
              </Typography>

              <Typography fontWeight={600}>
                {ticket.arrivalTime
                  ? new Date(
                      ticket.arrivalTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} />

          {/* Bus */}
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
          >
            Bus Details
          </Typography>

          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography color="text.secondary">
                Bus Name
              </Typography>

              <Typography fontWeight={600}>
                {ticket.busName}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography color="text.secondary">
                Bus Number
              </Typography>

              <Typography fontWeight={600}>
                {ticket.busNumber}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} />

          {/* Amount */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
            >
              Total Amount
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              ₹{ticket.amount}
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Please carry this ticket during your journey.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrintTicket;