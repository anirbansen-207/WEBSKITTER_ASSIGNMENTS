import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  getOwnBookings,
  getTicket,
} from "../../services/customerService";

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
            `No ticket found for booking ${booking._id}`,
          );
        }
      }

      return ticketList;
    },
    enabled: !!bookings && bookings.length > 0,
  });

  if (bookingsLoading || ticketsLoading) {
    return <p>Loading your tickets...</p>;
  }

  if (bookingsError || ticketsError) {
    return <p>Failed to load tickets.</p>;
  }

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
      <Typography variant="h4" gutterBottom>
        My Tickets
      </Typography>

      {tickets.map((ticket) => (
        <Card key={ticket.ticketNumber} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">
              {ticket.sourceCity}
              {" → "}
              {ticket.destinationCity}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>Ticket Number:</strong>{" "}
              {ticket.ticketNumber}
            </Typography>

            <Typography>
              <strong>Customer:</strong>{" "}
              {ticket.customerName}
            </Typography>

            <Typography>
              <strong>Bus:</strong>{" "}
              {ticket.busName}
            </Typography>

            <Typography>
              <strong>Bus Number:</strong>{" "}
              {ticket.busNumber}
            </Typography>

            <Typography>
              <strong>Seat(s):</strong>{" "}
              {ticket.seatNumbers?.join(", ")}
            </Typography>

            <Typography>
              <strong>Travel Date:</strong>{" "}
              {ticket.travelDate}
            </Typography>

            <Typography>
              <strong>Departure:</strong>{" "}
              {ticket.departureTime}
            </Typography>

            <Typography>
              <strong>Amount:</strong>{" "}
              ₹{ticket.amount}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>Status:</strong>{" "}
              {ticket.ticketStatus}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MyTickets;