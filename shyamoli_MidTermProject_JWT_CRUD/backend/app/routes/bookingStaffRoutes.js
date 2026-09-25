import express from "express";

import {
  getAllBookingStaffController,
  getSingleBookingStaffController,
  updateBookingStaffController,
  deleteBookingStaffController,
} from "../controllers/bookingStaffController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { ROLES } from "../utils/roles.js";

const router = express.Router();

// view all booking staff
router.get(
  "/get_all_staff",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  getAllBookingStaffController,
);

// view single booking staff
router.get(
  "/get_single_staff/:staffId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  getSingleBookingStaffController,
);

// update booking staff
router.put(
  "/update_staff/:staffId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  updateBookingStaffController,
);

// delete booking staff
router.delete(
  "/delete_staff/:staffId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  deleteBookingStaffController,
);

export default router;
