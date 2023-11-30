import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyControllers } from './academicFaculty.controller'
import { academicFacultyValidation } from './academicFaculty.validation'

const router = express.Router()

router
  .post(
    '/create-academic-faculty',
    validateRequest(
      academicFacultyValidation.createAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.createAcademicFaculty,
  )
  .get('/', AcademicFacultyControllers.getAllAcademicFaculties)
  .get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFacultyById)
  .patch(
    '/:facultyId',
    validateRequest(
      academicFacultyValidation.updateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicSemesterById,
  )

export const AcademicFacultyRoutes = router
