import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { Download } from "@mui/icons-material";

import {
  getOwnBookings,
  getTicket,
} from "../../services/customerService";

import { downloadTicketPdf } from "../../utils/ticketPdf";

const MyTickets = () => {
  // Get customer's bookings first
  const {
    data: bookings,
    isLoading: bookingsLoading,
    isError: bookingsError,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getOwnBookings,
  });

  // Fetch ticket for each booking
  const {
    data: tickets,
    isLoading: ticketsLoading,
    isError: ticketsError,
  } = useQuery({
    queryKey: ["my-tickets", bookings],
    queryFn: async () => {
      const ticketList = [];

      for (const booking of bookings) {
        try {
          const ticket = await getTicket(booking._id);

          if (ticket) {
            ticketList.push(ticket);
          }
        } catch (error) {
          // Booking may not have a ticket
          console.log(
            `No ticket found for booking ${booking._id}`
          );
        }
      }

      return ticketList;
    },
    enabled: !!bookings && bookings.length > 0,
  });

  // Loading
  if (bookingsLoading || ticketsLoading) {
    return <p>Loading your tickets...</p>;
  }

  // Error
  if (bookingsError || ticketsError) {
    return <p>Failed to load tickets.</p>;
  }

  // No tickets
  if (!tickets || tickets.length === 0) {
    return (
      <Box>
        <Typography variant="h4">
          My Tickets
        </Typography>

        <Typography sx={{ mt: 2 }}>
          You don't have any tickets yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Page title */}
      <Typography variant="h4" gutterBottom>
        My Tickets
      </Typography>

      {/* Ticket list */}
      {tickets.map((ticket) => (
        <Card
          key={ticket.ticketNumber}
          sx={{ mb: 3 }}
        >
          <CardContent>
            {/* Route */}
            <Typography variant="h6">
              {ticket.sourceCity}
              {" → "}
              {ticket.destinationCity}
            </Typography>

            {/* Ticket Number */}
            <Typography sx={{ mt: 2 }}>
              <strong>Ticket Number:</strong>{" "}
              {ticket.ticketNumber}
            </Typography>

            {/* Customer */}
            <Typography>
              <strong>Customer:</strong>{" "}
              {ticket.customerName}
            </Typography>

            {/* Bus */}
            <Typography>
              <strong>Bus:</strong>{" "}
              {ticket.busName}
            </Typography>

            {/* Bus Number */}
            <Typography>
              <strong>Bus Number:</strong>{" "}
              {ticket.busNumber}
            </Typography>

            {/* Seats */}
            <Typography>
              <strong>Seat(s):</strong>{" "}
              {ticket.seatNumbers?.join(", ")}
            </Typography>

            {/* Travel Date */}
            <Typography>
              <strong>Travel Date:</strong>{" "}
              {ticket.travelDate}
            </Typography>

            {/* Departure */}
            <Typography>
              <strong>Departure:</strong>{" "}
              {ticket.departureTime}
            </Typography>

            {/* Amount */}
            <Typography>
              <strong>Amount:</strong>{" "}
              ₹{ticket.amount}
            </Typography>

            {/* Status */}
            <Typography sx={{ mt: 1 }}>
              <strong>Status:</strong>{" "}
              {ticket.ticketStatus}
            </Typography>

            {/* Download PDF */}
            <Button
              variant="contained"
              startIcon={<Download />}
              sx={{ mt: 3 }}
              onClick={() => downloadTicketPdf(ticket)}
            >
              Download PDF
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MyTickets;