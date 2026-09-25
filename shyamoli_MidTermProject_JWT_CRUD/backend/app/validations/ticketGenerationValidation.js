import Joi from "joi";

export const createTicketSchema = Joi.object({
  bookingId: Joi.string().required(),
});