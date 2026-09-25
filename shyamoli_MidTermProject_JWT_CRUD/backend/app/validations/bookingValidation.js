import Joi from "joi";

export const createBookingSchema = Joi.object({
  tripId: Joi.string().required(),

  seatNumbers: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required(),

  // Required only when Booking Staff creates booking
  customerId: Joi.string().optional(),
});