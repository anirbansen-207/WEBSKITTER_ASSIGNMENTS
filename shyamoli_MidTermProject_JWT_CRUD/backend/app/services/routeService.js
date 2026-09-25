import Route from "../models/Route.js";
import Trip from "../models/Trip.js";

// CREATE ROUTE
export const createRouteService = async ({
  sourceCity,
  destinationCity,
  intermediateStops,
  boardingPoints,
  droppingPoints,
  routeDistance,
  routeStatus,
  createdBy,
}) => {
  try {
    // Check whether route already exists
    const existingRoute = await Route.findOne({
      sourceCity,
      destinationCity,
    });

    if (existingRoute) {
      const error = new Error(
        "Route already exists between these cities",
      );

      error.statusCode = 409;
      throw error;
    }

    // Create route
    const route = await Route.create({
      sourceCity,
      destinationCity,
      intermediateStops,
      boardingPoints,
      droppingPoints,
      routeDistance,
      routeStatus,
      createdBy,
    });

    return route;
  } catch (error) {
    throw error;
  }
};

// GET ALL ROUTES
export const getAllRoutesService = async () => {
  try {
    const routes = await Route.find();

    return routes;
  } catch (error) {
    throw error;
  }
};

// GET SINGLE ROUTE
export const getSingleRouteService = async (routeId) => {
  try {
    const route = await Route.findById(routeId);

    if (!route) {
      const error = new Error("Route not found");
      error.statusCode = 404;
      throw error;
    }

    return route;
  } catch (error) {
    throw error;
  }
};

// UPDATE ROUTE
export const updateRouteService = async (
  routeId,
  updateData,
) => {
  try {
    // Check whether route exists
    const route = await Route.findById(routeId);

    if (!route) {
      const error = new Error("Route not found");
      error.statusCode = 404;
      throw error;
    }

    // Update route
    const updatedRoute = await Route.findByIdAndUpdate(
      routeId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    return updatedRoute;
  } catch (error) {
    throw error;
  }
};

// DELETE ROUTE
export const deleteRouteService = async (routeId) => {
  try {
    // Check whether route exists
    const route = await Route.findById(routeId);

    if (!route) {
      const error = new Error("Route not found");
      error.statusCode = 404;
      throw error;
    }

    // Check whether this route is already
    // being used by any trip
    const trip = await Trip.findOne({
      routeId,
    });

    if (trip) {
      const error = new Error(
        "Route cannot be deleted because it is already used by a trip",
      );

      error.statusCode = 400;
      throw error;
    }

    // Delete route
    await Route.findByIdAndDelete(routeId);

    return route;
  } catch (error) {
    throw error;
  }
};