import joi from "joi";

export const updateOwnProfileSchema = joi.object({
  name: joi.string().trim().min(3).max(30).messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
  }),

  phone: joi
    .string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base":
        "Phone number must contain exactly 10 digits",
    }),
});