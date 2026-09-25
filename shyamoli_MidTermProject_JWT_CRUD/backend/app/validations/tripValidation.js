import Joi from "joi";

// CREATE TRIP
export const createTripSchema = Joi.object({
  routeId: Joi.string().required().messages({
    "string.empty": "Route ID is required",
    "any.required": "Route ID is required",
  }),

  busId: Joi.string().required().messages({
    "string.empty": "Bus ID is required",
    "any.required": "Bus ID is required",
  }),

  driverId: Joi.string().required().messages({
    "string.empty": "Driver ID is required",
    "any.required": "Driver ID is required",
  }),

  travelDate: Joi.date().required().messages({
    "date.base": "Invalid travel date",
    "any.required": "Travel date is required",
  }),

  departureTime: Joi.date().required().messages({
    "date.base": "Invalid departure time",
    "any.required": "Departure time is required",
  }),

  arrivalTime: Joi.date().required().messages({
    "date.base": "Invalid arrival time",
    "any.required": "Arrival time is required",
  }),

  estimatedTravelTime: Joi.string().trim().required().messages({
    "string.empty": "Estimated travel time is required",
    "any.required": "Estimated travel time is required",
  }),

  tripStatus: Joi.string()
    .valid("SCHEDULED", "ONGOING", "COMPLETED", "CANCELLED")
    .default("SCHEDULED"),
});

// UPDATE TRIP
export const updateTripSchema = Joi.object({
  routeId: Joi.string(),

  busId: Joi.string(),

  driverId: Joi.string(),

  travelDate: Joi.date().messages({
    "date.base": "Invalid travel date",
  }),

  departureTime: Joi.date().messages({
    "date.base": "Invalid departure time",
  }),

  arrivalTime: Joi.date().messages({
    "date.base": "Invalid arrival time",
  }),

  estimatedTravelTime: Joi.string().trim(),
}).min(1);

// UPDATE TRIP STATUS
// Status is handled separately from normal trip update.
export const updateTripStatusSchema = Joi.object({
  tripStatus: Joi.string()
    .valid("ONGOING", "COMPLETED")
    .required()
    .messages({
      "any.only": "Trip status must be ONGOING or COMPLETED",
      "any.required": "Trip status is required",
    }),
});