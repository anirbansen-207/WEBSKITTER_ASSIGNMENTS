import joi from "joi";

// create bus schema
export const createBusSchema = joi.object({
  busNumber: joi.string().trim().required().messages({
    "string.empty": "Bus number is required",
    "any.required": "Bus number is required",
  }),

  busName: joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Bus name is required",
    "string.min": "Bus name must be at least 2 characters long",
    "string.max": "Bus name must be at most 50 characters long",
    "any.required": "Bus name is required",
  }),

  busType: joi
    .string()
    .valid("AC", "NON_AC", "SLEEPER", "SEATER")
    .required()
    .messages({
      "any.only": "Bus type must be AC, NON_AC, SLEEPER, or SEATER",
      "any.required": "Bus type is required",
    }),

  totalSeats: joi.number().integer().min(1).required().messages({
    "number.base": "Total seats must be a number",
    "number.integer": "Total seats must be an integer",
    "number.min": "Total seats must be at least 1",
    "any.required": "Total seats are required",
  }),

  ticketPrice: joi.number().min(0).required(),
});

// update bus schema
export const updateBusSchema = joi.object({
  busName: joi.string().trim().min(2).max(50).messages({
    "string.min": "Bus name must be at least 2 characters long",
    "string.max": "Bus name must be at most 50 characters long",
  }),

  busType: joi.string().valid("AC", "NON_AC", "SLEEPER", "SEATER").messages({
    "any.only": "Bus type must be AC, NON_AC, SLEEPER, or SEATER",
  }),
  ticketPrice: joi.number()
  .min(0)
  .required(),
});
