import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidations } from './academicSemester.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router
  .post(
    '/create-academic-semester',
    validateRequest(
      AcademicSemesterValidations.createAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.createAcademicSemester,
  )
  .get(
    '/',
    auth(USER_ROLE.admin),
    AcademicSemesterControllers.getAcademicSemester,
  )
  .patch(
    '/:facultyId',
    validateRequest(
      AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemesterById,
  )

export const AcademicSemesterRoutes = router
