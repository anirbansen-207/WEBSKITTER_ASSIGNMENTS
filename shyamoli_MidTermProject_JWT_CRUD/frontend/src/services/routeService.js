import axiosInstance from "./axios";

// Get all routes
export const getAllRoutes = async () => {
  const response = await axiosInstance.get(
    "/api/routes/all_routes",
  );

  return response.data.data;
};

// Get single route
export const getSingleRoute = async (routeId) => {
  const response = await axiosInstance.get(
    `/api/routes/single_route/${routeId}`,
  );

  return response.data.data;
};

// Create route
export const createRoute = async (routeData) => {
  const response = await axiosInstance.post(
    "/api/routes/create_route",
    routeData,
  );

  return response.data.data;
};

// Update route
export const updateRoute = async ({
  routeId,
  routeData,
}) => {
  const response = await axiosInstance.put(
    `/api/routes/update_route/${routeId}`,
    routeData,
  );

  return response.data.data;
};

// Delete route
export const deleteRoute = async (routeId) => {
  const response = await axiosInstance.delete(
    `/api/routes/delete_route/${routeId}`,
  );

  return response.data.data;
};