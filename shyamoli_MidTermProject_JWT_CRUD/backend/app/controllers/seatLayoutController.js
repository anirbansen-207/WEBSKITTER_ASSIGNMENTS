import {
  createSeatLayoutService,
  getSeatLayoutService,
} from "../services/seatLayoutService.js";

import { successResponse } from "../utils/response.js";

// Create seat layout controller
export const createSeatLayoutController = async (req, res, next) => {
  try {
    const { busId, seats } = req.body;

    const seatLayout = await createSeatLayoutService({
      busId,
      seats,
    });

    return successResponse(
      res,
      201,
      "Seat layout created successfully",
      seatLayout,
    );
  } catch (error) {
    next(error);
  }
};

// Get seat layout controller
export const getSeatLayoutController = async (req, res, next) => {
  try {
    const { busId } = req.params;

    const seatLayout = await getSeatLayoutService(busId);

    return successResponse(res, 200, "Seat layout fetched successfully", seatLayout);
  } catch (error) {
    next(error);
  }
};