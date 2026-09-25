import express from "express";

import {
  createSeatLayoutController,
  getSeatLayoutController,
} from "../controllers/seatLayoutController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";

const router = express.Router();

// Create seat layout
router.post(
  "/create_seat_layout",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  createSeatLayoutController,
);

// Get seat layout
router.get(
  "/seat_layout/:busId",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER, ROLES.BOOKING_STAFF]),
  getSeatLayoutController,
);

export default router;