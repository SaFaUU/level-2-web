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
  const { specialties, ...doctorData } = data;

  console.log(specialties);
  console.log(doctorData);

  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.$transaction(async (transactionClient) => {
    const updatedDoctorData = await transactionClient.doctor.update({
      where: {
        id,
      },
      data: doctorData,
      include: {
        doctorSpecialties: true,
      },
    });

    if (specialties && specialties.length > 0) {
      const deleteSpecialtiesIds = specialties.filter(
        (specialty: any) => specialty.isDeleted
      );

      for (const specialty of deleteSpecialtiesIds) {
        // Delete doctorSpecialties

        await transactionClient.doctorSpecialties.deleteMany({
          where: {
            doctorID: doctorInfo.id,
            specialitiesId: specialty.specialitiesId,
          },
        });
      }

      // Create doctorSpecialties
      const createSpecialtiesIds = specialties.filter(
        (specialty: any) => !specialty.isDeleted
      );
      for (const specialty of createSpecialtiesIds) {
        await transactionClient.doctorSpecialties.create({
          data: {
            doctorID: doctorInfo.id,
            specialitiesId: specialty.specialitiesId,
          },
        });
      }
    }
  });

  const result = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: doctorInfo.id,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialities: true,
        },
      },
    },
  });

  return result;
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
