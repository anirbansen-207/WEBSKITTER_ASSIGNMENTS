import { createTicketService } from "../services/ticketGenerationService.js";
import { successResponse } from "../utils/response.js";

export const createTicketController = async (req, res, next) => {
  try {
    const { userId: customerId } = req.user;
    const { bookingId } = req.body;

    const ticket = await createTicketService({
      bookingId,
      customerId,
    });

    return successResponse(
      res,
      201,
      "Ticket generated successfully",
      ticket
    );
  } catch (error) {
    next(error);
  }
};