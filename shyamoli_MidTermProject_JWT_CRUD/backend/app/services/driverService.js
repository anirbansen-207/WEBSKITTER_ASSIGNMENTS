import Driver from "../models/Driver.js";
import Trip from "../models/Trip.js";

// Driver own profile
export const getDriverOwnProfileService = async (driverId) => {
  try {
    const driver = await Driver.findById(driverId).select(
      "-password -otp -otpExpiry -refreshToken -tokenVersion -createdBy",
    );

    if (!driver) {
      const error = new Error("Driver profile not found");
      error.statusCode = 404;
      throw error;
    }
    return driver;
  } catch (error) {
    throw error;
  }
};


// view assigned trips
export const getAssignedTripsService = async (driverId) => {
  try {
    const trips = await Trip.find({
      driverId,
    })
      .populate(
        "routeId",
        "sourceCity destinationCity intermediateStops routeDistance"
      )
      .populate(
        "busId",
        "busNumber busName busType totalSeats availableSeats"
      )
      .populate(
        "driverId",
        "name email phone"
      )
      .sort({
        travelDate: 1,
        departureTime: 1,
      });

    return trips;
  } catch (error) {
    throw error;
  }
};