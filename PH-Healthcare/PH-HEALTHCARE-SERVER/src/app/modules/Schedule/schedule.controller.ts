import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ScheduleService } from "./schedule.service";
import pick from "../../../shared/pick";
import { IAuthUser } from "../../interfaces/common";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await ScheduleService.getAllFromDB(
      filters,
      options,
      req.user as IAuthUser
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedules fetched successfully",
      data: result,
    });
  }
);

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.deleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

const getByIDFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.getByIDFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule fetched successfully",
    data: result,
  });
});

export const ScheduleController = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
  getByIDFromDB,
};
