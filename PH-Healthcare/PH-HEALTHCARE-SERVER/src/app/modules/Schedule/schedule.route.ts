import { NextFunction, Request, Response, Router } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { ScheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/", ScheduleController.insertIntoDB);

router.get(
  "/",
  auth(UserRole.DOCTOR, UserRole.ADMIN),
  ScheduleController.getAllFromDB
);

router.delete(
  "/:id",
  auth(UserRole.DOCTOR, UserRole.ADMIN),
  ScheduleController.deleteFromDB
);

router.get(
  "/:id",
  auth(UserRole.DOCTOR, UserRole.ADMIN),
  ScheduleController.getByIDFromDB
);

export const ScheduleRoutes = router;
