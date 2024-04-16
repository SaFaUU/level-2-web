import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { doctorService } from "./doctor.service";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.getAllFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctors fetched successfully",
    data: result,
  });
});

const getByIDFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.getByIDFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.updateIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor updated successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.deleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});
const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.softDeleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});

export const DoctorController = {
  getAllFromDB,
  getByIDFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
