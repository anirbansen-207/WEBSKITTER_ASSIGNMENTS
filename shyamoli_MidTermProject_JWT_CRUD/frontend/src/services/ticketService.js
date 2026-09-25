import axiosInstance from "./axios";

// Generate a ticket for a successful booking
export const createTicket = async (bookingId) => {
  const response = await axiosInstance.post(
    "/api/ticket/create_ticket",
    {
      bookingId,
    },
  );

  // Return the actual ticket data
  // from the backend response.
  return response.data.data;
};