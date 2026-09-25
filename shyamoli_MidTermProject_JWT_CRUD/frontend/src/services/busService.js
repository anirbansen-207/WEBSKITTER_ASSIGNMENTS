import axiosInstance from "./axios";

// Get all buses
export const getAllBuses = async () => {
  const response = await axiosInstance.get(
    "/api/bus/get_all_bus",
  );

  return response.data.data;
};

// Get single bus
export const getSingleBus = async (busId) => {
  const response = await axiosInstance.get(
    `/api/bus/get_single_bus/${busId}`,
  );

  return response.data.data;
};

// Create bus
export const createBus = async (busData) => {
  const response = await axiosInstance.post(
    "/api/bus/create_bus",
    busData,
  );

  return response.data.data;
};

// Update bus
export const updateBus = async ({
  busId,
  busData,
}) => {
  const response = await axiosInstance.put(
    `/api/bus/update_bus/${busId}`,
    busData,
  );

  return response.data.data;
};

// Delete bus
export const deleteBus = async (busId) => {
  const response = await axiosInstance.delete(
    `/api/bus/delete_bus/${busId}`,
  );

  return response.data.data;
};

// Find bus by bus number
export const getBusByNumber = async (busNumber) => {
  const response = await axiosInstance.get(
    `/api/bus/bus_number/${busNumber}`,
  );

  return response.data.data;
};

// Adjust available seats
export const adjustBusSeats = async ({
  busNumber,
  seatData,
}) => {
  const response = await axiosInstance.patch(
    `/api/bus/adjust_bus_seat/${busNumber}`,
    seatData,
  );

  return response.data.data;
};