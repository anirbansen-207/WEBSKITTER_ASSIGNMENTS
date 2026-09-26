import {
  useQuery,
} from "@tanstack/react-query";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { getTicket } from "../../services/customerService";

import jsPDF from "jspdf";

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  // Ticket received during normal navigation
  const stateTicket =
    location.state?.ticket;

  // Booking ID from URL
  //
  // Example:
  // /customer/ticket?bookingId=123456
  const bookingId =
    searchParams.get("bookingId");

  // =========================================================
  // FETCH TICKET
  // =========================================================
  //
  // If ticket already exists in router state,
  // there is no need to make another API call.
  //
  // If the page is refreshed, router state disappears.
  // In that case bookingId allows us to fetch the ticket again.
  //
  const {
    data: fetchedTicket,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "customer-ticket",
      bookingId,
    ],

    queryFn: () =>
      getTicket(bookingId),

    enabled:
      Boolean(bookingId) &&
      !stateTicket,
  });

  // Use ticket from navigation state first.
  // Otherwise use the ticket fetched from backend.
  const ticket =
    stateTicket || fetchedTicket;

  // =========================================================
  // LOADING
  // =========================================================

  if (!ticket && isLoading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress />

        <Typography color="text.secondary">
          Loading your ticket...
        </Typography>
      </Box>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (!ticket && isError) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h5"
          color="error"
        >
          Failed to load ticket.
        </Typography>

        <Typography
          sx={{
            mt: 1,
          }}
          color="text.secondary"
        >
          {error?.response?.data?.message ||
            "Unable to load ticket details."}
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() =>
            navigate("/customer")
          }
        >
          Go to Dashboard
        </Button>
      </Box>
    );
  }

  // =========================================================
  // NO TICKET
  // =========================================================

  if (!ticket) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">
          Ticket not found.
        </Typography>

        <Typography
          sx={{
            mt: 1,
          }}
          color="text.secondary"
        >
          We could not find a ticket for this
          booking.
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() =>
            navigate("/customer")
          }
        >
          Go to Dashboard
        </Button>
      </Box>
    );
  }

  // =========================================================
  // DOWNLOAD PDF
  // =========================================================

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // =========================
    // TITLE
    // =========================

    doc.setFontSize(22);

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Shamolly Bus Service",
      20,
      20,
    );

    // =========================
    // SUBTITLE
    // =========================

    doc.setFontSize(16);

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      "Booking Confirmation",
      20,
      32,
    );

    doc.line(
      20,
      38,
      190,
      38,
    );

    // =========================
    // TICKET INFORMATION
    // =========================

    doc.setFontSize(12);

    let y = 52;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Ticket Number:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      String(
        ticket.ticketNumber || "-"
      ),
      65,
      y,
    );

    y += 10;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Customer:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      String(
        ticket.customerName || "-"
      ),
      65,
      y,
    );

    // =========================
    // JOURNEY DETAILS
    // =========================

    y += 15;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Journey Details",
      20,
      y,
    );

    y += 10;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "From:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      String(
        ticket.sourceCity || "-"
      ),
      65,
      y,
    );

    y += 8;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "To:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      String(
        ticket.destinationCity || "-"
      ),
      65,
      y,
    );

    y += 8;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Bus:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      String(
        ticket.busName || "-"
      ),
      65,
      y,
    );

    y += 8;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Bus Number:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      String(
        ticket.busNumber || "-"
      ),
      65,
      y,
    );

    y += 8;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Seat(s):",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      ticket.seatNumbers?.join(
        ", "
      ) || "-",
      65,
      y,
    );

    // =========================
    // TRAVEL DETAILS
    // =========================

    y += 15;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Travel Details",
      20,
      y,
    );

    y += 10;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Travel Date:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      ticket.travelDate
        ? new Date(
            ticket.travelDate,
          ).toLocaleDateString()
        : "-",
      65,
      y,
    );

    y += 8;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Departure:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      ticket.departureTime
        ? new Date(
            ticket.departureTime,
          ).toLocaleString()
        : "-",
      65,
      y,
    );

    y += 8;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Arrival:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      ticket.arrivalTime
        ? new Date(
            ticket.arrivalTime,
          ).toLocaleString()
        : "-",
      65,
      y,
    );

    // =========================
    // PAYMENT
    // =========================

    y += 15;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Payment",
      20,
      y,
    );

    y += 10;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Amount:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      `Rs. ${ticket.amount || 0}`,
      65,
      y,
    );

    y += 8;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.text(
      "Status:",
      20,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.text(
      String(
        ticket.ticketStatus || "-"
      ),
      65,
      y,
    );

    // =========================
    // FOOTER
    // =========================

    y += 25;

    doc.line(
      20,
      y,
      190,
      y,
    );

    y += 10;

    doc.setFontSize(10);

    doc.text(
      "Thank you for choosing Shamolly Bus Service.",
      20,
      y,
    );

    // =========================
    // SAVE PDF
    // =========================

    doc.save(
      `Shamolly-Ticket-${ticket.ticketNumber}.pdf`,
    );
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundColor: "#f5f7fb",

        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 600,
        }}
      >
        Booking Confirmation
      </Typography>

      <Card
        sx={{
          maxWidth: 650,
          borderRadius: 2,
        }}
      >
        <CardContent
          sx={{
            p: 4,
          }}
        >
          {/* ================= HEADER ================= */}

          <Box
            sx={{
              textAlign: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={600}
            >
              Ticket Confirmed
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color:
                  ticket.ticketStatus ===
                  "CANCELLED"
                    ? "error.main"
                    : "success.main",
                fontWeight: 600,
              }}
            >
              {ticket.ticketStatus}
            </Typography>
          </Box>

          <Divider />

          {/* ================= TICKET DETAILS ================= */}

          <Box sx={{ mt: 3 }}>
            <Typography>
              <strong>
                Ticket Number:
              </strong>{" "}
              {ticket.ticketNumber}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>
                Customer:
              </strong>{" "}
              {ticket.customerName}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* ================= JOURNEY ================= */}

          <Typography
            variant="h6"
            sx={{ mb: 2 }}
          >
            Journey Details
          </Typography>

          <Typography>
            <strong>From:</strong>{" "}
            {ticket.sourceCity}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <strong>To:</strong>{" "}
            {ticket.destinationCity}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <strong>Bus:</strong>{" "}
            {ticket.busName}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <strong>
              Bus Number:
            </strong>{" "}
            {ticket.busNumber}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <strong>Seat(s):</strong>{" "}
            {ticket.seatNumbers?.join(
              ", ",
            )}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* ================= TRAVEL ================= */}

          <Typography
            variant="h6"
            sx={{ mb: 2 }}
          >
            Travel Details
          </Typography>

          <Typography>
            <strong>
              Travel Date:
            </strong>{" "}
            {ticket.travelDate
              ? new Date(
                  ticket.travelDate,
                ).toLocaleDateString()
              : "-"}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <strong>
              Departure:
            </strong>{" "}
            {ticket.departureTime
              ? new Date(
                  ticket.departureTime,
                ).toLocaleString()
              : "-"}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <strong>
              Arrival:
            </strong>{" "}
            {ticket.arrivalTime
              ? new Date(
                  ticket.arrivalTime,
                ).toLocaleString()
              : "-"}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* ================= PAYMENT ================= */}

          <Typography
            variant="h6"
            sx={{ mb: 1 }}
          >
            Payment
          </Typography>

          <Typography
            variant="h5"
            fontWeight={600}
          >
            ₹{ticket.amount}
          </Typography>

          {/* ================= BUTTONS ================= */}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                navigate("/customer")
              }
            >
              GO TO DASHBOARD
            </Button>

            {/* Download PDF remains available */}
            <Button
              variant="contained"
              startIcon={
                <DownloadIcon />
              }
              onClick={
                handleDownloadPDF
              }
            >
              Download PDF
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Ticket;