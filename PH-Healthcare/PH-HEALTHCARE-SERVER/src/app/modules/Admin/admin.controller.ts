import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await AdminServices.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admins fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getByIDFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getByIDFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin fetched successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.updateIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.deleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});
const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.softDeleteFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

export const AdminController = {
  getAllFromDB,
  getByIDFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
