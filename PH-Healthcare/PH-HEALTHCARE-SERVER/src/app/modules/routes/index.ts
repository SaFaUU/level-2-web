import express from "express";
import { userRoutes } from "../User/user.routes";
import { AdminRoutes } from "../Admin/admin.routes";
import { AuthRoutes } from "../Auth/auth.routes";
import { SpecialtiesRoutes } from "../Specialties/specialties.routes";
import { DoctorRoutes } from "../Doctor/doctor.routes";
import { PatientRoutes } from "../Patient/patient.route";

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
