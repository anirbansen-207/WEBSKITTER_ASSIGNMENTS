import express from "express";

import { createTicketController } from "../controllers/ticketGenerationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateMiddleware } from "../middlewares/validationMiddleware.js";
import { ROLES } from "../utils/roles.js";

import { createTicketSchema } from "../validations/ticketGenerationValidation.js";

const router = express.Router();

router.post(
  "/create_ticket",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  validateMiddleware(createTicketSchema),
  createTicketController
);

export default router;