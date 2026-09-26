import {
  getDriverOwnProfileService,
  getAssignedTripsService,
  getTripPassengersService,
} from "../services/driverService.js";

import { successResponse } from "../utils/response.js";

// DRIVER OWN PROFILE

export const getDriverOwnProfileController = async (req, res, next) => {
  try {
    // authMiddleware stores the logged-in user's information
    // inside req.user

    const { userId: driverId } = req.user;

    const driver = await getDriverOwnProfileService(driverId);

    return successResponse(
      res,
      200,
      "Driver profile fetched successfully",
      driver,
    );
  } catch (error) {
    next(error);
  }
};

// DRIVER ASSIGNED TRIPS

export const getAssignedTripsController = async (req, res, next) => {
  try {
    // Get the logged-in driver's ID
    const { userId: driverId } = req.user;

    const trips = await getAssignedTripsService(driverId);

    return successResponse(
      res,
      200,
      "Assigned trips fetched successfully",
      trips,
    );
  } catch (error) {
    next(error);
  }
};

// Get passengers of an assigned trip
export const getTripPassengersController = async (req, res, next) => {
  try {
    // Get logged-in driver's ID
    const { userId: driverId } = req.user;

    // Get trip ID from URL
    const { tripId } = req.params;

    // Get passengers
    const passengers = await getTripPassengersService(driverId, tripId);

    return successResponse(
      res,
      200,
      "Trip passengers fetched successfully",
      passengers,
    );
  } catch (error) {
    next(error);
  }
};
