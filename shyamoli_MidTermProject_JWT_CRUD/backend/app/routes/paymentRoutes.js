import express from "express";

import {
  createPaymentController,
} from "../controllers/paymentController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { ROLES } from "../utils/roles.js";
import { validateMiddleware } from "../middlewares/validationMiddleware.js";

import {
  createPaymentSchema,
} from "../validations/paymentValidation.js";

const router = express.Router();

router.post(
  "/create_payment",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  validateMiddleware(createPaymentSchema),
  createPaymentController,
);

export default router;