import express from "express";

import {
  getDriverOwnProfileController,
  getAssignedTripsController,
  getTripPassengersController,
} from "../controllers/driverController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import { roleMiddleware } from "../middlewares/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";

const router = express.Router();

// Driver can view own profile
router.get(
  "/my_profile",
  authMiddleware,
  roleMiddleware([ROLES.DRIVER]),
  getDriverOwnProfileController
);

// Driver can view assigned trips
router.get(
  "/assigned_trips",
  authMiddleware,
  roleMiddleware([ROLES.DRIVER]),
  getAssignedTripsController
);

// Get passengers of an assigned trip
router.get(
  "/trip/:tripId/passengers",
  authMiddleware,
  roleMiddleware([ROLES.DRIVER]),
  getTripPassengersController
);

export default router;