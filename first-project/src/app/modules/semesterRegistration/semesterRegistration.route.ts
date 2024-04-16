import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { semesterRegistrationValidations } from './semesterRegistration.validation'
import { semesterRegistrationController } from './semesterRegistration.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router
  .post(
    '/create-semester-registration',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(
      semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
    ),
    semesterRegistrationController.createSemesterRegistration,
  )
  .get(
    '/:id',
    auth(
      USER_ROLE.admin,
      USER_ROLE.superAdmin,
      USER_ROLE.faculty,
      USER_ROLE.student,
    ),
    semesterRegistrationController.getSingleSemesterRegistration,
  )
  .patch(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(
      semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
    ),
    semesterRegistrationController.updateSemesterRegistration,
  )
  .get(
    '/',
    auth(
      USER_ROLE.admin,
      USER_ROLE.superAdmin,
      USER_ROLE.faculty,
      USER_ROLE.student,
    ),
    semesterRegistrationController.getAllSemesterRegistrations,
  )

export const semesterRegistrationRoutes = router
