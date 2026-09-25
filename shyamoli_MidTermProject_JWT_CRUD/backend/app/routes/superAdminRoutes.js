import express from "express";
import {
  createBookingStaffController,
  createDriverController,
  viewCustomerController,
  viewSingleCustomerController,
  viewDriverController,
  viewSingleDriverController,
  viewBookingStaffController,
  viewSingleBookingStaffController,
  updateBookingStaffController,
  updateDriverController,
  deleteDriverController,
  deleteBookingStaffController,
} from "../controllers/superAdminController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateMiddleware } from "../middlewares/validationMiddleware.js";
import {
  createBookingStaffSchema,
  createDriverSchema,
  updateBookingStaffSchema,
  updateDriverSchema,
} from "../validations/superAdminValidation.js";
import { ROLES } from "../utils/roles.js";

const router = express.Router();

// CREATE BOOKING STAFF
router.post(
  "/create_bookingStaff",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  validateMiddleware(createBookingStaffSchema),
  createBookingStaffController,
);

// CREATE DRIVER
router.post(
  "/create_driver",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  validateMiddleware(createDriverSchema),
  createDriverController,
);

// view all customers
router.get(
  "/view_customers",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN, ROLES.BOOKING_STAFF]),
  viewCustomerController,
);

// view single customer
router.get(
  "/view_customer/:customerId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  viewSingleCustomerController,
);
// view all drivers
router.get(
  "/view_drivers",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  viewDriverController,
);

// view single driver
router.get(
  "/view_driver/:driverId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  viewSingleDriverController,
);

// view all booking staff
router.get(
  "/view_booking_staff",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  viewBookingStaffController,
);

// view single booking staff
router.get(
  "/view_booking_staff/:bookingStaffId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  viewSingleBookingStaffController,
);

// update booking staff
router.put(
  "/update_booking_staff/:bookingStaffId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  validateMiddleware(updateBookingStaffSchema),
  updateBookingStaffController,
);

// update driver
router.put(
  "/update_driver/:driverId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  validateMiddleware(updateDriverSchema),
  updateDriverController,
);

// delete driver
router.delete(
  "/delete_driver/:driverId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  deleteDriverController,
);

// delete booking staff
router.delete(
  "/delete_booking_staff/:bookingStaffId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  deleteBookingStaffController,
);

export default router;
