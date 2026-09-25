import express from "express";
import {
  viewOwnProfileController,
  updateOwnProfileController,
  getOwnBookingsController,
  cancelBookingController,
  viewTicketController
} from "../controllers/customerController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { ROLES } from "../utils/roles.js";
import { validateMiddleware } from "../middlewares/validationMiddleware.js";
import { updateOwnProfileSchema } from "../validations/customerValidation.js";

const router = express.Router();

// view own profile
router.get(
  "/view_own_profile",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  viewOwnProfileController,
);

// update own profile
router.put(
  "/update_own_profile",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  validateMiddleware(updateOwnProfileSchema),
  updateOwnProfileController,
);

// get own bookings route
router.get(
  "/own_bookings",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  getOwnBookingsController,
);

// cancel booking route
router.delete(
  "/cancel_booking/:bookingId",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  cancelBookingController,
)

// view ticket routes
router.get(
  "/view_ticket/:bookingId",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  viewTicketController
)
export default router;
