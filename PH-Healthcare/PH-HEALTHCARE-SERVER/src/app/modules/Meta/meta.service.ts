import { PaymentStatus, Prescription, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";

const fetchDashboardMetaData = async (user: IAuthUser) => {
  switch (user?.role) {
    case UserRole.DOCTOR:
      return getDoctorMetaData(user as IAuthUser);
    case UserRole.PATIENT:
      return getPatientMetaData(user as IAuthUser);
    case UserRole.SUPER_ADMIN:
      return getSuperAdminMetaData();
    case UserRole.ADMIN:
      return getAdminMetaData();
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User Role");
  }
};

const getSuperAdminMetaData = async () => {
  const appointmentCount = await prisma.appointment.count();
  const patientCount = await prisma.patient.count();
  const doctorCount = await prisma.doctor.count();
  const prescriptionCount = await prisma.prescription.count();
  const paymentCount = await prisma.payment.count();
  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: PaymentStatus.PAID,
    },
  });

  const adminCount = await prisma.admin.count();

  const barChartData = await getBarChartData();

  const pieChartData = await getPieChartData();

  return {
    appointmentCount,
    patientCount,
    doctorCount,
    prescriptionCount,
    paymentCount,
    totalRevenue: totalRevenue._sum.amount,
    adminCount,
    barChartData,
    pieChartData,
  };
};

const getDoctorMetaData = async (user: IAuthUser) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const appointmentCount = await prisma.appointment.count({
    where: {
      doctorId: doctorData.id,
    },
  });

  const patientCount = await prisma.appointment.groupBy({
    by: ["patientId"],
    _count: {
      id: true,
    },
    where: {
      doctorId: doctorData.id,
    },
  });

  const reviewCount = await prisma.review.count({
    where: {
      doctorId: doctorData.id,
    },
  });

  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      appointment: {
        doctorId: doctorData.id,
        paymentStatus: PaymentStatus.PAID,
      },
    },
  });

  const appointmentStatusDistribution = await prisma.appointment.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
    where: {
      doctorId: doctorData.id,
    },
  });

  const formattedStatusDistribution = appointmentStatusDistribution.map(
    (item) => ({
      status: item.status,
      count: item._count.id,
    })
  );

  return {
    appointmentCount,
    patientCount: patientCount.length,
    reviewCount,
    totalRevenue: totalRevenue._sum.amount,
    appointmentStatusDistribution: formattedStatusDistribution,
  };
};

const getPatientMetaData = async (user: IAuthUser) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const appointmentCount = await prisma.appointment.count({
    where: {
      patientId: patientData.id,
    },
  });

  const prescriptionCount = await prisma.prescription.count({
    where: {
      patientId: patientData.id,
    },
  });

  const reviewCount = await prisma.review.count({
    where: {
      patientId: patientData.id,
    },
  });

  const appointmentStatusDistribution = await prisma.appointment.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
    where: {
      patientId: patientData.id,
    },
  });

  const formattedStatusDistribution = appointmentStatusDistribution.map(
    (item) => ({
      status: item.status,
      count: item._count.id,
    })
  );

  return {
    appointmentCount,
    prescriptionCount: prescriptionCount,
    reviewCount,
    appointmentStatusDistribution: formattedStatusDistribution,
  };
};

const getAdminMetaData = async () => {
  const appointmentCount = await prisma.appointment.count();
  const patientCount = await prisma.patient.count();
  const doctorCount = await prisma.doctor.count();
  const prescriptionCount = await prisma.prescription.count();
  const paymentCount = await prisma.payment.count();
  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: PaymentStatus.PAID,
    },
  });

  const barChartData = await getBarChartData();

  const pieChartData = await getPieChartData();

  return {
    appointmentCount,
    patientCount,
    doctorCount,
    prescriptionCount,
    paymentCount,
    totalRevenue: totalRevenue._sum.amount,
    barChartData,
    pieChartData,
  };
};

const getBarChartData = async () => {
  const appointmentCountByMonth: {
    month: Date;
    count: bigint;
  }[] = await prisma.$queryRaw`
SELECT DATE_TRUNC('month', "createdAt") AS month,
CAST(COUNT(*) AS INTEGER) AS count
FROM "appointments"
GROUP BY month
ORDER BY month ASC
`;

  return appointmentCountByMonth;
};

const getPieChartData = async () => {
  const appointmentStatusDistribution = await prisma.appointment.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const formattedStatusDistribution = appointmentStatusDistribution.map(
    (item) => ({
      status: item.status,
      count: item._count.id,
    })
  );

  return formattedStatusDistribution;
};

export const MetaService = {
  fetchDashboardMetaData,
};
