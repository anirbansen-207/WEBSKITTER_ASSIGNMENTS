import  {createPaymentService}  from "../services/paymentService.js";
import { successResponse } from "../utils/response.js";


// create payment controller
export const createPaymentController = async (req, res, next) => {
  try {
    // customerId comes from authMiddleware
    const { userId: customerId } = req.user;

    // req.body
    const { bookingId, paymentMethod } = req.body;

    // call createPaymentService
    const payment = await createPaymentService({
      bookingId,
      customerId,
      paymentMethod,
    });

    // send response
    return successResponse(res, 200, "Payment created successfully", payment);
  
} catch (error) {
    next(error);
  }
};
