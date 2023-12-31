import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { semesterRegistrationValidations } from './semesterRegistration.validation'
import { semesterRegistrationController } from './semesterRegistration.controller'

const router = express.Router()

router
  .post(
    '/create-semester-registration',
    validateRequest(
      semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
    ),
    semesterRegistrationController.createSemesterRegistration,
  )
  .get('/:id', semesterRegistrationController.getSingleSemesterRegistration)
  .patch(
    '/:id',
    validateRequest(
      semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
    ),
    semesterRegistrationController.updateSemesterRegistration,
  )
  .get('/', semesterRegistrationController.getAllSemesterRegistrations)

export const semesterRegistrationRoutes = router
