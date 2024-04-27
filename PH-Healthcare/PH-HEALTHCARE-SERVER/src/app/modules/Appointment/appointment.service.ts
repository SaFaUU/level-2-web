import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { addHours, addMinutes, format } from "date-fns";
import { Prisma, Schedule } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IAuthUser } from "../../interfaces/common";

const createAppointment = async (
  payload: any,
  user: IAuthUser
): Promise<Schedule> => {
  const data: Prisma.ScheduleCreateInput = {
    ...payload,
    doctorId: payload.doctorId,
    patientId: user.id,
  };
  return prisma.schedule.create({ data });
};

export const AppointmentService = {
  createAppointment,
};
