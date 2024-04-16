import { NextFunction, Request, Response, Router } from "express";
import { SpecialtiesController } from "./specialties.controller";
import { fileUploader } from "../../../helpers/fileUploader";
import { specialityValidationSchemas } from "./specialties.validation";

const router = Router();

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = specialityValidationSchemas.create.parse(
      JSON.parse(req.body.data)
    );
    return SpecialtiesController.insertIntoDB(req, res, next);
  }
);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return SpecialtiesController.getAllFromDB(req, res, next);
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  return SpecialtiesController.deleteFromDB(req, res, next);
});

export const SpecialtiesRoutes = router;
