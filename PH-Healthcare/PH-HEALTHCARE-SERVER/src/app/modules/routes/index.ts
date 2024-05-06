import express from "express";
import { userRoutes } from "../User/user.routes";
import { AdminRoutes } from "../Admin/admin.routes";
import { AuthRoutes } from "../Auth/auth.routes";
import { SpecialtiesRoutes } from "../Specialties/specialties.routes";
import { DoctorRoutes } from "../Doctor/doctor.routes";
import { PatientRoutes } from "../Patient/patient.route";
import { ScheduleRoutes } from "../Schedule/schedule.route";
import { DoctorScheduleRoutes } from "../DoctorSchedule/doctorSchedule.route";
import { AppointmentRoutes } from "../Appointment/appointment.route";
import { PaymentRoutes } from "../Payment/payment.route";
import { PrescriptionRoutes } from "../Prescription/prescription.route";
import { ReviewRoutes } from "../Review/review.route";
import { MetaRoutes } from "../Meta/meta.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
  {
    path: "/doctor",
    route: DoctorRoutes,
  },
  {
    path: "/patient",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: DoctorScheduleRoutes,
  },
  {
    path: "/appointment",
    route: AppointmentRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/prescription",
    route: PrescriptionRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/meta",
    route: MetaRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
