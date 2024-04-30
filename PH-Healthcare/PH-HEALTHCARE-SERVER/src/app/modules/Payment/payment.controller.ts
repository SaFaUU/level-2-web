import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PaymentService } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.initPayment();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initialized successfully",
    data: result,
  });
});

export const PaymentController = {
  initPayment,
};
