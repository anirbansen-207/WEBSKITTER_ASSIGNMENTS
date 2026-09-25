import joi from "joi";

// create driver validation
export const createDriverSchema = joi.object({
  name: joi.string().trim().required().messages({
    "string.empty": "Driver name is required",
    "any.required": "Driver name is required",
  }),

  email: joi.string().email().trim().required().messages({
    "string.email": "Please enter a valid email",
    "string.empty": "Driver email is required",
    "any.required": "Driver email is required",
  }),

  password: joi.string().min(6).required().messages({
    "string.min": "Password must contain at least 6 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),

  phone: joi.string().trim().required().messages({
    "string.empty": "Driver phone is required",
    "any.required": "Driver phone is required",
  }),
});

// Update driver validation
export const updateDriverSchema = joi.object({
  name: joi.string().trim().required().messages({
    "string.empty": "Driver name is required",
    "any.required": "Driver name is required",
  }),

  email: joi.string().email().trim().required().messages({
    "string.email": "Please enter a valid email",
    "string.empty": "Driver email is required",
    "any.required": "Driver email is required",
  }),

  phone: joi.string().trim().required().messages({
    "string.empty": "Driver phone is required",
    "any.required": "Driver phone is required",
  }),

  isActive: joi.boolean(),
}).min(1);