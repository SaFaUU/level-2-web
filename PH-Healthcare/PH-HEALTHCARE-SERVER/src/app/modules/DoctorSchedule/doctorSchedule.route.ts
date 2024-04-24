import { NextFunction, Request, Response, Router } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.insertIntoDB);

// router.get("/", auth(UserRole.DOCTOR), DoctorScheduleController.getAllFromDB);

export const DoctorScheduleRoutes = router;
