import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./modules/student/student.route";
import httpStatus from "http-status";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import connectDb from "./utils/db";
import createServer from "./server";

require("dotenv").config();

// export const app: Application = express();
export const app = createServer();
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDb();
  console.log(`App is running at http://localhost:${PORT}`);
});
