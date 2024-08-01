import express from "express";
import cors from "cors";
import httpStatus from "http-status";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { StudentRoutes } from "./modules/student/student.route";
import { Request, Response } from "express";

function createServer() {
  const app = express();

  app.use(express.json());

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1/student", StudentRoutes);

  // Global error handler
  app.use(globalErrorHandler);

  // Not found handler
  app.use((req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Not Found",
      errorMessages: [
        {
          path: req.originalUrl,
          message: "API Not Found",
        },
      ],
    });
  });

  return app;
}

export default createServer;
