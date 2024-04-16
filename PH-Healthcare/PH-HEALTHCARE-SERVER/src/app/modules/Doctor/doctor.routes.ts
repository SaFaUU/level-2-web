import express from "express";
import { DoctorController } from "./doctor.controller";
const router = express.Router();

router.get("/", DoctorController.getAllFromDB);
router.get("/:id", DoctorController.getByIDFromDB);
router.patch("/:id", DoctorController.updateIntoDB);
router.delete("/:id", DoctorController.deleteFromDB);
router.delete("/soft/:id", DoctorController.softDeleteFromDB);

export const DoctorRoutes = router;
