import jsPDF from "jspdf";

export const downloadTicketPdf = (ticket) => {
  const doc = new jsPDF();

  // =========================
  // Ticket Header
  // =========================

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("SHAMOLLY BUS TICKET", 105, 20, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Bus Booking Ticket", 105, 28, {
    align: "center",
  });

  // Horizontal line
  doc.line(20, 34, 190, 34);

  // =========================
  // Ticket Information
  // =========================

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Ticket Information", 20, 45);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `Ticket Number: ${ticket.ticketNumber || "-"}`,
    20,
    55
  );

  doc.text(
    `Passenger Name: ${ticket.customerName || "-"}`,
    20,
    63
  );

  doc.text(
    `Seat Number: ${
      ticket.seatNumbers?.join(", ") || "-"
    }`,
    20,
    71
  );

  // =========================
  // Journey Information
  // =========================

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Journey Information", 20, 85);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `From: ${ticket.sourceCity || "-"}`,
    20,
    95
  );

  doc.text(
    `To: ${ticket.destinationCity || "-"}`,
    20,
    103
  );

  doc.text(
    `Travel Date: ${
      ticket.travelDate
        ? new Date(ticket.travelDate).toLocaleDateString()
        : "-"
    }`,
    20,
    111
  );

  doc.text(
    `Departure: ${
      ticket.departureTime
        ? new Date(ticket.departureTime).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )
        : "-"
    }`,
    20,
    119
  );

  doc.text(
    `Arrival: ${
      ticket.arrivalTime
        ? new Date(ticket.arrivalTime).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )
        : "-"
    }`,
    20,
    127
  );

  // =========================
  // Bus Information
  // =========================

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Bus Information", 20, 141);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `Bus Name: ${ticket.busName || "-"}`,
    20,
    151
  );

  doc.text(
    `Bus Number: ${ticket.busNumber || "-"}`,
    20,
    159
  );

  // =========================
  // Payment Information
  // =========================

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Information", 20, 173);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `Amount: ₹${ticket.amount ?? 0}`,
    20,
    183
  );

  doc.text(
    `Status: ${ticket.ticketStatus || "ACTIVE"}`,
    20,
    191
  );

  // =========================
  // Footer
  // =========================

  doc.line(20, 200, 190, 200);

  doc.setFontSize(9);
  doc.text(
    "Please carry this ticket during your journey.",
    105,
    210,
    {
      align: "center",
    }
  );

  // =========================
  // Download PDF
  // =========================

  doc.save(
    `${ticket.ticketNumber || "Shamolly-Ticket"}.pdf`
  );
};