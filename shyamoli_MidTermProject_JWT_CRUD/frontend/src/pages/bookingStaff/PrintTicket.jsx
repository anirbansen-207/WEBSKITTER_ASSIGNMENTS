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

import {
  ArrowBack,
  Download,
  Print,
} from "@mui/icons-material";

import { downloadTicketPdf } from "../../utils/ticketPdf";

const PrintTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ticket was passed from Bookings page through navigation state
  const ticket = location.state?.ticket;

  // If ticket is not available
  if (!ticket) {
    return (
      <Box>
        <Typography color="error" mb={2}>
          Ticket information not found.
        </Typography>

        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
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

  // Download ticket as PDF
  const handleDownload = () => {
    downloadTicketPdf(ticket);
  };

  return (
    <Box>
      {/* Page title */}
      <Typography variant="h5" fontWeight={600} mb={3}>
        Ticket
      </Typography>

      {/* Ticket Card */}
      <Card
        sx={{
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box
            sx={{
              textAlign: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
            >
              SHAMOLLY BUS TICKET
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Bus Booking Ticket
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Ticket Information */}
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
          >
            Ticket Information
          </Typography>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">
                Ticket Number
              </Typography>

              <Typography fontWeight={600}>
                {ticket.ticketNumber || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">
                Passenger
              </Typography>

              <Typography fontWeight={600}>
                {ticket.customerName || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">
                Seat Number
              </Typography>

              <Typography fontWeight={600}>
                {ticket.seatNumbers?.join(", ") || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">
                Amount
              </Typography>

              <Typography fontWeight={600}>
                ₹{ticket.amount ?? 0}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} />

          {/* Journey Information */}
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
          >
            Journey Information
          </Typography>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">
                From
              </Typography>

              <Typography fontWeight={600}>
                {ticket.sourceCity || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">
                To
              </Typography>

              <Typography fontWeight={600}>
                {ticket.destinationCity || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
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

            <Grid item xs={12} sm={4}>
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

            <Grid item xs={12} sm={4}>
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

          {/* Bus Information */}
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
          >
            Bus Information
          </Typography>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">
                Bus Name
              </Typography>

              <Typography fontWeight={600}>
                {ticket.busName || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">
                Bus Number
              </Typography>

              <Typography fontWeight={600}>
                {ticket.busNumber || "-"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} />

          {/* Status */}
          <Box
            sx={{
              textAlign: "center",
              mb: 3,
            }}
          >
            <Typography color="text.secondary">
              Ticket Status
            </Typography>

            <Typography
              fontWeight={700}
              sx={{ mt: 0.5 }}
            >
              {ticket.ticketStatus || "ACTIVE"}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() =>
                navigate("/booking-staff/bookings")
              }
            >
              Back
            </Button>

            <Button
              variant="outlined"
              startIcon={<Print />}
              onClick={handlePrint}
            >
              Print Ticket
            </Button>

            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownload}
            >
              Download PDF
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrintTicket;