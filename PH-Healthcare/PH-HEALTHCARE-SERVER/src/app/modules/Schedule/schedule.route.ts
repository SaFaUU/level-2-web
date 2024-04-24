import { NextFunction, Request, Response, Router } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { ScheduleController } from "./schedule.controller";

const router = Router();

router.post("/", ScheduleController.insertIntoDB);

router.get("/", ScheduleController.getAllFromDB);

export const ScheduleRoutes = router;
