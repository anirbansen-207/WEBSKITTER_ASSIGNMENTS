import express from "express";
import {
  createBusController,
  getAllBusController,
  getSingleBusController,
  updateBusController,
  deleteBusController,
  getBusDetailsByBusNumberController,
  adjustBusSeatController
} from "../controllers/busController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateMiddleware } from "../middlewares/validationMiddleware.js";
import {
  createBusSchema,
  updateBusSchema,
} from "../validations/busValidation.js";
import { ROLES } from "../utils/roles.js";

const router = express.Router();

// create bus route
router.post(
  "/create_bus",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  validateMiddleware(createBusSchema),
  createBusController,
);

// get all bus route
router.get(
  "/get_all_bus",
  authMiddleware,
  roleMiddleware([
    ROLES.SUPER_ADMIN,
    ROLES.CUSTOMER,
    ROLES.BOOKING_STAFF,
    ROLES.DRIVER,
  ]),
  getAllBusController,
);

// get single bus
router.get(
  "/get_single_bus/:busId",
  authMiddleware,
  roleMiddleware([
    ROLES.SUPER_ADMIN,
    ROLES.CUSTOMER,
    ROLES.BOOKING_STAFF,
    ROLES.DRIVER,
  ]),
  getSingleBusController,
);

// update bus route
router.put(
  "/update_bus/:busId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN, ROLES.BOOKING_STAFF]),
  validateMiddleware(updateBusSchema),
  updateBusController,
);

// delete bus
router.delete(
  "/delete_bus/:busId",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  deleteBusController,
);

// get bus by bus number
router.get(
  "/bus_number/:busNumber",
  authMiddleware,
  roleMiddleware([
    ROLES.SUPER_ADMIN,
    ROLES.CUSTOMER,
    ROLES.BOOKING_STAFF,
    ROLES.DRIVER,
  ]),
  getBusDetailsByBusNumberController
);

// adjust bus seat
router.patch(
    "/adjust_bus_seat/:busNumber",
    authMiddleware,
    roleMiddleware([
        ROLES.SUPER_ADMIN,
        ROLES.BOOKING_STAFF,
    ]),
    adjustBusSeatController
);

export default router;
