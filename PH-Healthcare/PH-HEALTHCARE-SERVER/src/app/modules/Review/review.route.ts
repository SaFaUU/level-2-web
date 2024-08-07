import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth(UserRole.PATIENT), ReviewController.insertIntoDB);

router.get("/", ReviewController.getAllFromDB);

export const ReviewRoutes = router;
