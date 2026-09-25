import express from "express";

import {
  getDriverOwnProfileController,
  getAssignedTripsController,
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

export default router;