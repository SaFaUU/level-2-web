import { PaymentStatus, Prescription } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";

const insertIntoDB = async (
  user: IAuthUser,
  payload: Partial<Prescription>
) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
      paymentStatus: PaymentStatus.PAID,
    },
    include: {
      patient: true,
      doctor: true,
    },
  });

  if (user?.email !== appointmentData.doctor.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This is not your appointment!");
  }

  const result = await prisma.prescription.create({
    data: {
      appointmentId: appointmentData.id,
      doctorId: appointmentData.doctor.id,
      patientId: appointmentData.patient.id,
      instructions: payload.instructions as string,
      followUpDate: payload.followUpDate || null || undefined,
    },
    include: {
      patient: true,
      doctor: true,
    },
  });

  return result;
};

const patientPrescription = async (
  user: IAuthUser,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);

  const result = await prisma.prescription.findMany({
    where: {
      patient: {
        email: user?.email,
      },
    },
    take: limit,
    skip: skip,
    orderBy: options.sortBy
      ? {
          [options.sortBy]: options.sortOrder || "asc",
        }
      : { createdAt: "desc" },
    include: {
      patient: true,
      doctor: true,
    },
  });

  const total = await prisma.prescription.count({
    where: {
      patient: {
        email: user?.email,
      },
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const PrescriptionService = {
  insertIntoDB,
  patientPrescription,
};
