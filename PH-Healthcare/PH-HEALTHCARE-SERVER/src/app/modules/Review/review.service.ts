import { PaymentStatus, Prescription, Prisma, Review } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAuthUser, IGenericResponse } from "../../interfaces/common";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";
import {
  reviewRelationalFields,
  reviewRelationalFieldsMapper,
} from "./review.constants";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";

const insertIntoDB = async (user: IAuthUser, payload: any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

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

  if (user?.email !== appointmentData.patient.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This is not your appointment");
  }

  return await prisma.$transaction(async (tx) => {
    const result = await prisma.review.create({
      data: {
        appointmentId: appointmentData.id,
        doctorId: appointmentData.doctor.id,
        patientId: appointmentData.patient.id,
        rating: payload.rating,
        comment: payload.comment,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    const averageRating = await tx.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        appointmentId: appointmentData.id,
      },
    });

    await tx.doctor.update({
      where: {
        id: appointmentData.doctor.id,
      },
      data: {
        averageRating: averageRating._avg.rating as number,
      },
    });

    return result;
  });
};

const getAllFromDB = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Review[]>> => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (reviewRelationalFields.includes(key)) {
          return {
            [reviewRelationalFieldsMapper[key]]: {
              email: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.ReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.review.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
    include: {
      doctor: true,
      patient: true,
      //appointment: true,
    },
  });
  const total = await prisma.review.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const ReviewService = {
  insertIntoDB,
  getAllFromDB,
};
