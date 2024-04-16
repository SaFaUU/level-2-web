import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicDepartmentValidation } from './academicDepartment.validation'
import { AcademicDepartmentControllers } from './academicDepartment.controller'
const router = express.Router()

router
  .post(
    '/create-academic-department',
    // validateRequest(
    //   academicDepartmentValidation.createAcademicDepartmentValidationSchema,
    // ),
    AcademicDepartmentControllers.createAcademicDepartment,
  )
  .get('/', AcademicDepartmentControllers.getAllAcademicDepartments)
  .get(
    '/:departmentId',
    AcademicDepartmentControllers.getSingleAcademicDepartmentById,
  )
  .patch(
    '/:departmentId',
    validateRequest(
      academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.updateAcademicDepartmentById,
  )

export const AcademicDepartmentRoutes = router
