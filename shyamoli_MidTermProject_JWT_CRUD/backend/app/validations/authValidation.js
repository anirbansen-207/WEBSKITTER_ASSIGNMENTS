import joi from "joi";
import { ROLES } from "../utils/roles.js";

// register schema
export const registerSchema = joi.object({
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
    .optional()
    .messages({
      "string.pattern.base": "Phone number must contain exactly 10 digits",
    }),
});

// verify otp schema
export const verifyOTPSchema = joi.object({
  email: joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  otp: joi
    .string()
    .trim()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.pattern.base": "OTP must contain exactly 6 digits",
      "any.required": "OTP is required",
    }),
});

// login schema
export const loginSchema = joi.object({
  email: joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: joi.string().required().messages({
    "string.empty": "Password is required",

    "any.required": "Password is required",
  }),

  role: joi.string().valid(
    ROLES.SUPER_ADMIN,
    ROLES.BOOKING_STAFF,
    ROLES.DRIVER,
    ROLES.CUSTOMER
  ).required(),

});

// resend OTP schema
export const resendOTPSchema = joi.object({
  email: joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
});

// forgot password schema
export const forgotPasswordSchema = joi.object({
  email: joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
});