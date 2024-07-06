import { NextFunction, Request, Response, Router } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.insertIntoDB);

router.get(
  "/my-schedule",
  auth(UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  DoctorScheduleController.getMySchedule
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  DoctorScheduleController.deleteFromDB
);

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  DoctorScheduleController.getAllFromDB
);

export const DoctorScheduleRoutes = router;
