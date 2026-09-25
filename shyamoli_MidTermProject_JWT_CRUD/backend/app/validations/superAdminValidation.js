import joi from "joi";

// create staff schema
export const createBookingStaffSchema = joi.object({
  name: joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
    "any.required": "Name is required",
  }),

  email: joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: joi.string().min(4).max(30).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 4 characters long",
    "string.max": "Password must be at most 30 characters long",
    "any.required": "Password is required",
  }),

  phone: joi
    .string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must contain exactly 10 digits",
      "any.required": "Phone number is required",
    }),
});

// create driver schema
export const createDriverSchema = joi.object({
  name: joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
    "any.required": "Name is required",
  }),

  email: joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: joi.string().min(4).max(30).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 4 characters long",
    "string.max": "Password must be at most 30 characters long",
    "any.required": "Password is required",
  }),

  phone: joi
    .string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must contain exactly 10 digits",
      "any.required": "Phone number is required",
    }),
});

// update driver schema
export const updateDriverSchema = joi.object({
  name: joi.string().trim().min(3).max(30).messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
  }),

  phone: joi
    .string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone number must contain exactly 10 digits",
    }),

  password: joi.string().min(4).max(30).messages({
    "string.min": "Password must be at least 4 characters long",
    "string.max": "Password must be at most 30 characters long",
  }),
});

// update booking staff schema
export const updateBookingStaffSchema = joi.object({
  name: joi.string().trim().min(3).max(30).messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
  }),

  phone: joi
    .string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone number must contain exactly 10 digits",
    }),

  password: joi.string().min(4).max(30).messages({
    "string.min": "Password must be at least 4 characters long",
    "string.max": "Password must be at most 30 characters long",
  }),
});
