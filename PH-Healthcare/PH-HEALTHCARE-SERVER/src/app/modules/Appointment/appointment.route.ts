import { NextFunction, Request, Response, Router } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { AppointmentController } from "./appointment.controller";

const router = Router();

router.post(
  "/",
  auth(UserRole.DOCTOR),
  AppointmentController.createAppointment
);

export const AppointmentRoutes = router;
