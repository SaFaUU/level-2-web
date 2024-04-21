import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { addHours, format } from "date-fns";

const insertIntoDB = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  console.log("lastDate: ", lastDate);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addHours(
        `${format(currentDate, "yyyy-MM-dd")}`,
        Number(startTime.split(":")[0])
      )
    );

    const endDateTime = new Date(
      addHours(
        `${format(lastDate, "yyyy-MM-dd")}`,
        Number(endTime.split(":")[0])
      )
    );
  }

  console.log(payload);

  return payload;
};

export const ScheduleService = {
  insertIntoDB,
};
