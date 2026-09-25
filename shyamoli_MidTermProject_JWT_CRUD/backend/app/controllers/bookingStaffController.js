import {
  getAllBookingStaffService,
  getSingleBookingStaffService,
  updateBookingStaffService,
  deleteBookingStaffService,
} from "../services/bookingStaffService.js";

import { successResponse } from "../utils/response.js";

// view all booking staff
export const getAllBookingStaffController = async (req, res, next) => {
  try {
    const staff = await getAllBookingStaffService();

    return successResponse(
      res,
      200,
      "Booking staff fetched successfully",
      staff,
    );
  } catch (error) {
    next(error);
  }
};

// view single booking staff
export const getSingleBookingStaffController = async (req, res, next) => {
  try {
    const staff = await getSingleBookingStaffService(req.params.staffId);

    return successResponse(
      res,
      200,
      "Booking staff fetched successfully",
      staff,
    );
  } catch (error) {
    next(error);
  }
};

// update booking staff
export const updateBookingStaffController = async (req, res, next) => {
  try {
    const staff = await updateBookingStaffService(req.params.staffId, req.body);

    return successResponse(
      res,
      200,
      "Booking staff updated successfully",
      staff,
    );
  } catch (error) {
    next(error);
  }
};

// delete booking staff
export const deleteBookingStaffController = async (req, res, next) => {
  try {
    const staff = await deleteBookingStaffService(req.params.staffId);

    return successResponse(
      res,
      200,
      "Booking staff deleted successfully",
      staff,
    );
  } catch (error) {
    next(error);
  }
};
