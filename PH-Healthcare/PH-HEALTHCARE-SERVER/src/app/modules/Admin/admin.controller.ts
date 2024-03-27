import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log("Filters", filters);
    console.log("Options", options);
    const result = await AdminServices.getAllFromDB(filters, options);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

const getByIDFromDB = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.getByIDFromDB(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

const updateIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.updateIntoDB(req.params.id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.deleteFromDB(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};
const softDeleteFromDB = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.softDeleteFromDB(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

export const AdminController = {
  getAllFromDB,
  getByIDFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
