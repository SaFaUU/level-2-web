import { Request, Response } from "express";
import { AdminServices } from "./admin.service";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.getAllFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "Admins fetched successfully",
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
};
