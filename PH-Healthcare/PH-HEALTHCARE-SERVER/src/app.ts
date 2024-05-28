import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/modules/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import { AppointmentServices } from "./app/modules/Appointment/appointment.service";
import cron from "node-cron";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
  })
);

app.use(cookieParser());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cron.schedule("* * * * *", () => {
  try {
    AppointmentServices.cancelUnpaidAppointments();
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Hello World!",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    error: {
      path: req.originalUrl,
      method: req.method,
      message: "Your requested API is not found",
    },
  });
});

export default app;
