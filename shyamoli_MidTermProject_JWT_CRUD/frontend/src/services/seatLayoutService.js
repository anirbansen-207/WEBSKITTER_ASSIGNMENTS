import axiosInstance from "./axios";

// Create seat layout for a bus
export const createSeatLayout = async (layoutData) => {
  const response = await axiosInstance.post(
    "/api/seat-layout/create_seat_layout",
    layoutData
  );

  return response.data.data;
};

// Get seat layout of a bus
export const getSeatLayout = async (busId) => {
  const response = await axiosInstance.get(
    `/api/seat-layout/seat_layout/${busId}`
  );

  return response.data.data;
};