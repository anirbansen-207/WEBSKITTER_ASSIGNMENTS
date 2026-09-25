import Joi from "joi";

export const createPaymentSchema = Joi.object({
  bookingId: Joi.string().required(),

  paymentMethod: Joi.string()
    .valid("CARD", "UPI", "NET_BANKING", "CASH")
    .required(),
});