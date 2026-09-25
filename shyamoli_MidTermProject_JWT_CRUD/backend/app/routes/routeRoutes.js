import express from "express";

import {
  createRouteController,
  getAllRoutesController,
  getSingleRouteController,
  updateRouteController,
  deleteRouteController,
} from "../controllers/routeController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";

import { validateMiddleware } from "../middlewares/validationMiddleware.js";

import {
  createRouteSchema,
  updateRouteSchema,
} from "../validations/routeValidation.js";

const router = express.Router();

// CREATE ROUTE
router.post(
  "/create_route",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  validateMiddleware(createRouteSchema),
  createRouteController,
);

// GET ALL ROUTES
router.get(
  "/all_routes",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN, ROLES.BOOKING_STAFF]),
  getAllRoutesController,
);

// GET SINGLE ROUTE
router.get(
  "/single_route/:routeId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN, ROLES.BOOKING_STAFF]),
  getSingleRouteController,
);

// UPDATE ROUTE
router.put(
  "/update_route/:routeId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN, ROLES.BOOKING_STAFF]),
  validateMiddleware(updateRouteSchema),
  updateRouteController,
);

// DELETE ROUTE
router.delete(
  "/delete_route/:routeId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN, ROLES.BOOKING_STAFF]),
  deleteRouteController,
);

export default router;
