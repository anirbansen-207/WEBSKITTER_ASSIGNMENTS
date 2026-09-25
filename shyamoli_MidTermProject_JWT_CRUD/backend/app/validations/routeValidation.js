import Joi from "joi";

export const createRouteSchema = Joi.object({
  sourceCity: Joi.string().trim().required().messages({
    "string.empty": "Source city is required",
    "any.required": "Source city is required",
  }),

  destinationCity: Joi.string().trim().required().messages({
    "string.empty": "Destination city is required",
    "any.required": "Destination city is required",
  }),

  intermediateStops: Joi.array().items(Joi.string().trim()).default([]),

  boardingPoints: Joi.array().items(Joi.string().trim()).default([]),

  droppingPoints: Joi.array().items(Joi.string().trim()).default([]),

  routeDistance: Joi.number().min(0).required().messages({
    "number.base": "Route distance must be a number",
    "number.min": "Route distance cannot be negative",
    "any.required": "Route distance is required",
  }),

  routeStatus: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE"),
});

// UPDATE ROUTE
export const updateRouteSchema = Joi.object({
  sourceCity: Joi.string().trim(),

  destinationCity: Joi.string().trim(),

  intermediateStops: Joi.array().items(Joi.string().trim()),

  boardingPoints: Joi.array().items(Joi.string().trim()),

  droppingPoints: Joi.array().items(Joi.string().trim()),

  routeDistance: Joi.number().min(0),

  routeStatus: Joi.string().valid("ACTIVE", "INACTIVE"),
}).min(1);
