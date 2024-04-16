import { Doctor } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getAllFromDB = async () => {
  const result = await prisma.doctor.findMany();
  return result;
};

const getByIDFromDB = async (id: string) => {
  const result = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (id: string, data: Partial<Doctor>) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updatedDoctorData = await prisma.doctor.update({
    where: {
      id,
    },
    data,
  });
  return updatedDoctorData;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.doctor.delete({
    where: {
      id,
    },
  });
  return result;
};

const softDeleteFromDB = async (id: string) => {
  const result = await prisma.doctor.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

export const doctorService = {
  getAllFromDB,
  getByIDFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
